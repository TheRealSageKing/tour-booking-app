class BookingController {
	async bookTour(req, res, next) {
		if (!req.session.user) {
			return res.redirect("/auth/login?redirect=" + encodeURIComponent(req.originalUrl));
		}
		res.render("pages/user/book-tour");
	}
}

module.exports = new BookingController();
