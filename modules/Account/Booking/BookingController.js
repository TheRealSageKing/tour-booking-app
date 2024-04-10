const Booking = require("../../../schemas/BookingSchema");

class BookingController {
	index(req, res, next) {
		//fetch all the booking for the currently logged user.
		const user = req.session.user;

		const bookings = Booking.find({ user: user._id }).exec();

		res.render("pages/backend/booking", { pageTitle: "Bookings", bookings });
	}
}

module.exports = new BookingController();
