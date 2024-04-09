class AuthController {
	signUp(req, res, next) {
		res.render("pages/auth/signup");
	}

	createUser() {}

	login(req, res, next) {
		res.render("pages/auth/login");
	}

	loginUser() {}

	reset(req, res, next) {
		res.render("pages/auth/forgot-password");
	}

	resetPassword() {}
}

module.exports = new AuthController();
