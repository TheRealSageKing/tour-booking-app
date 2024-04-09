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
}

module.exports = new HomeController();
