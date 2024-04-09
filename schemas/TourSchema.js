const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
	name: String,
	country: String,
	locations: [String],
	images: [String],
	cost: Number,
	discount: Number,
	createdAt: { type: Date, default: () => Date.now(), immutable: true },
	updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Tour", TourSchema);
