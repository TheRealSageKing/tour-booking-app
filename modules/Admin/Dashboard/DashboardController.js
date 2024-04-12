class DashboardController {
	index(req, res, next) {
		const user = req.session.user;
		res.render("pages/backend/index", { user });
	}
}
module.exports = new DashboardController();
