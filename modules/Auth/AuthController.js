const { LOGIN_ROUTE } = require("../../config/constants");
const User = require("../../schemas/UserSchema");

class AuthController {
	signUp(req, res, next) {
		res.render("pages/auth/signup", { active: "/auth/signup" });
	}

	async createUser(req, res, next) {
		const { name, email, password } = req.body;
		try {
			console.log(req.body);
			const user = await User.create({
				name,
				email,
				password,
			});

			if (!user) {
				throw Error("User account was not created");
			}

			res.status(201).json({ success: true, message: "Account was created successfully", data: user });
		} catch (error) {
			// console.log(error);
			res.status(400).json({ success: false, message: error.message });
		}
	}

	login(req, res, next) {
		res.render("pages/auth/login", { active: "/auth/login" });
	}

	async loginUser(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email }).exec();

			if (!user) {
				return res.status(400).json({ success: false, message: "Invalid email or password" });
			}

			user.comparePassword(password, (err, isValidOwner) => {
				if (!isValidOwner) {
					return res.status(400).json({ success: false, message: "Invalid email or password" });
				}
			});

			req.session.user = user;

			return res.status(200).json({ success: true, message: "Login was successful. Redirecting ..." });
		} catch (error) {
			next(error);
		}
	}

	logout(req, res, next) {
		if (req.session.user) {
			req.session.destroy(() => console.log("user logged out"));
		}

		res.redirect(LOGIN_ROUTE);
	}

	reset(req, res, next) {
		res.render("pages/auth/forgot-password", { active: "/auth/reset-password" });
	}

	resetPassword() {
		//TODO: Coming Soon
	}

	async defaultAdmin(req, res, next) {
		await User.create({ name: "Administrator", email: "admin@admin.com", password: "password", type: 1 });
		res.json({ success: true });
	}
}

module.exports = new AuthController();
