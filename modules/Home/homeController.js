const config = require("../../config/config");
const Tour = require("../../schemas/TourSchema");

class HomeController {
	index(req, res, next) {
		return res.render("pages/index");
	}

	about(req, res, next) {
		res.render("pages/about");
	}
	contact(req, res, next) {
		res.render("pages/contact");
	}

	async tours(req, res, next) {
		const tours = await Tour.find({ isActive: 1 }).exec();
		console.log(tours);
		res.render("pages/tours", { tours, baseUrl: config.baseUrl });
	}

	async tourDetail(req, res, next) {
		const tour = await Tour.findOne({ _id: req.params.id }).exec();
		console.log(tour);
		res.render("pages/tour-details", { tour, baseUrl: config.baseUrl });
	}

	async bookTour(req, res, next) {
		if (!req.session.user) {
			return res.redirect("/auth/login?redirect=/book-tour");
		}
		res.render("pages/book-tour", { tours });
	}
}

module.exports = new HomeController();
