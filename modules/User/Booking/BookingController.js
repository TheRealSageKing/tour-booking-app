const { randomBytes } = require("crypto");
const Booking = require("../../../schemas/BookingSchema");
const { LOGIN_ROUTE } = require("../../../config/constants");

class BookingController {
	async bookTour(req, res, next) {
		if (!req.session.user) {
			return res.redirect("/auth/login?redirect=" + encodeURIComponent(req.originalUrl));
		}
		res.render("pages/user/book-tour", { active: "/user/book-tour", user: req.session.user });
	}

	//creates a new booking
	async store(req, res, next) {
		try {
			//get the user session
			const user = req.session.user;

			//generate a booking id;
			const bookingId = randomBytes(4).toString("hex");

			const booking = await Booking.create({
				user: user._id,
				tourType: req.body.tour,
				quantity: req.body.qty,
				totalCost: req.body.cost,
				attendees: req.body.attendees.split(","),
				isPending: true,
				bookingId,
			});

			res.status(200).json({ success: true, message: "Tour was booked succesfully", data: booking });
		} catch (error) {
			next(error);
		}
	}

	async bookings(req, res, next) {
		const user = req.session.user;

		if (!user) {
			return res.redirect(LOGIN_ROUTE);
		}

		const bookings = await Booking.find({ user: user._id }).populate("user tourType");
		res.render("pages/user/bookings", { bookings, active: "/user/bookings", user });
	}
}

module.exports = new BookingController();
