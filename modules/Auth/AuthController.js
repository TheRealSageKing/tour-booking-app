const { Booking } = require("../../schemas/BookingSchema");
const UserSchema = require("../../schemas/UserSchema");

class AuthController {
	signUp(req, res, next) {
		res.render("pages/auth/signup");
	}

	createUser() {}

	login(req, res, next) {
		res.render("pages/auth/login");
	}

	loginUser(req, res, next) {
		try {
			const { email, password } = req.body;

			res.status(200).json({ success: true, message: "succes" });
		} catch (error) {
			next(error);
		}
	}

	reset(req, res, next) {
		res.render("pages/auth/forgot-password");
	}

	resetPassword() {}
}

module.exports = new AuthController();
