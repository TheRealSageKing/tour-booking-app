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

	bookTour(req, res, next) {
		res.render("pages/book-tour");
	}
}

module.exports = new HomeController();
