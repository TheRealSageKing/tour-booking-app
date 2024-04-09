require("dotenv").config();

const config = {
	environment: process.env.APP_ENV || "development",
	port: process.env.PORT || 5001,
};

module.exports = config;
