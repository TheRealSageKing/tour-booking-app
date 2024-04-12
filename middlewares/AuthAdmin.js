const { LOGIN_ROUTE } = require("../config/constants");

const AuthAdmin = (req, res, next) => {
	if (!req.session || !req.session.user) {
		return res.redirect(LOGIN_ROUTE);
	}

	if (req.session.user.type !== 1) {
		return res.redirect("/user/dashboard");
	}

	next();
};

module.exports = AuthAdmin;
