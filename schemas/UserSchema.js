const mongoose = require("mongoose");
const argon2 = require("argon2");
const redisClient = require("redis").createClient();
const session = require("express-session");
const RedisStore = require("connect-redis").default;

// Initialize RedisStore with express-session
const redisStore = new RedisStore({ client: redisClient });

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: false },
	type: { type: Number, required: true, default: 0 }, //usertype 1 = admin , 0 = customer
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await argon2.hash(this.password);
		next();
	}

	next();
});

UserSchema.pre("remove", async function (next) {
	if (this._id && redisStore) {
		const sessionId = "sess:" + this._id.toString(); // Assuming session IDs are stored in the format 'sess:sessionId'

		// Delete session from Redis using session ID
		await new Promise((resolve, reject) => {
			redisClient.del(sessionId, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	next();
});

UserSchema.methods.comparePassword = async function (plainPassword, callback) {
	return callback(null, argon2.verify(this.password, plainPassword));
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
