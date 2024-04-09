const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.SchemaType.ObjectId,
		ref: "User",
	},
	bookingDate: Date,
	tourType: {
		type: mongoose.SchemaType.ObjectId,
		ref: "Tour",
	},
	quantity: Number,
	totalCost: Number,
	isPending: Boolean,
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
});

module.exports.Booking = mongoose.model("Booking", BookingSchema);
