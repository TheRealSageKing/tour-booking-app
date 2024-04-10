const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: false },
	type: { type: Number, required: true, default: 0 }, //usertype 1 = admin , 0 = customer
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});

UserSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		const saltHash = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, saltHash);
		next();
	}

	next();
});
UserSchema.methods.comparePassword = function (plainPassword, callback) {
	return callback(null, bcrypt.compareSync(plainPassword, this.password));
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
