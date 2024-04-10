class DashboardController {
	index(req, res, next) {
		res.render("pages/backend/index");
	}
}
module.exports = new DashboardController();
