const { LOGIN_ROUTE } = require("../config/constants");

const AuthUser = (req, res, next) => {
	if (!req.session || !req.session.user) {
		return res.redirect(LOGIN_ROUTE);
	}

	if (req.session.user.type !== 0) {
		return res.redirect("/account/dashboard");
	}

	next();
};

module.exports = AuthUser;
