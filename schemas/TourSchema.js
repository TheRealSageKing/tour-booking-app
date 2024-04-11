const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
	name: String,
	description: String,
	country: String,
	locations: [String],
	images: [String],
	cost: Number,
	discount: Number,
	isActive: {
		type: Boolean,
		default: true,
	},
	createdAt: { type: Date, default: () => Date.now(), immutable: true },
	updatedAt: { type: Date, default: () => Date.now() },
});

const Tour = mongoose.model("Tour", TourSchema);
module.exports = Tour;
