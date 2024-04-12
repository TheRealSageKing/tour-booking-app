const config = require("../../config/config");
const Tour = require("../../schemas/TourSchema");

class HomeController {
	index(req, res, next) {
		const user = req.session.user;
		return res.render("pages/index", { user, active: "/" });
	}

	about(req, res, next) {
		const user = req.session.user;
		res.render("pages/about", { user, active: "/about" });
	}
	contact(req, res, next) {
		const user = req.session.user;
		res.render("pages/contact", { user, active: "/contact" });
	}

	async tours(req, res, next) {
		const user = req.session.user;
		const tours = await Tour.find({ isActive: 1 }).exec();
		console.log(tours);
		res.render("pages/tours", { tours, baseUrl: config.baseUrl, user, active: "/tours" });
	}

	async tourDetail(req, res, next) {
		const user = req.session.user;
		const tour = await Tour.findOne({ _id: req.params.id }).exec();
		console.log(tour);
		res.render("pages/tour-details", { tour, baseUrl: config.baseUrl, user });
	}

	async bookTour(req, res, next) {
		if (!req.session.user) {
			return res.redirect("/auth/login?redirect=" + encodeURIComponent(req.originalUrl));
		}
		res.render("pages/user/book-tour");
	}
}

module.exports = new HomeController();
