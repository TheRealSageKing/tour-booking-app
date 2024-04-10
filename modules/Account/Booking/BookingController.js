class BookingController {
	index(req, res, next) {
		res.render("pages/backend/booking");
	}
}

module.exports = new BookingController();
