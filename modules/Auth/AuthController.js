const { Booking } = require("../../schemas/BookingSchema");
const { User } = require("../../schemas/UserSchema");
const bcrypt = require("bcrypt");

class AuthController {
	signUp(req, res, next) {
		res.render("pages/auth/signup");
	}

	createUser() {}

	login(req, res, next) {
		res.render("pages/auth/login");
	}

	async loginUser(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ success: false, message: "Invalid email or password" });
			}

			const isValidOwner = await user.comparePassword(password);
			if (!isValidOwner) {
				return res.status(400).json({ success: false, message: "Invalid email or password" });
			}

			req.session.user = user;
			return res.status(200).json({ success: true, message: "success" });
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
