class DashboardController {
	index(req, res, next) {
		const user = req.session.user;
		res.render("pages/user/dashboard", { active: "/user/dashboard", user });
	}
}

module.exports = new DashboardController();
