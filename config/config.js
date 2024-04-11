require("dotenv").config();

const config = {
	environment: process.env.APP_ENV || "development",
	port: process.env.PORT || 5001,
	session_secret: process.env.SESSION_SECRET || "secret",
	baseUrl: (process.env.APP_ENV == "development" ? "http://localhost:" + (process.env.PORT || 5001) : process.env.APP_BASE_URL) + "/",
};

module.exports = config;
