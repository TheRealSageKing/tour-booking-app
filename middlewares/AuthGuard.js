const { LOGIN_ROUTE } = require("../config/constants");

const AuthGuard = (req, res, next) => {
	if (!req.session || !req.session.user) {
		return res.redirect(LOGIN_ROUTE);
	}

	next();
};

module.exports = AuthGuard;
