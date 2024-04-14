const config = require("../config/config");

const ErrorHandler = (err, req, res, next) => {
	const errorStatusCode = err.statusCode || 500;
	const errorMessage = err.message || "Unknown Error";

	res.status(errorStatusCode).json({
		success: false,
		error: errorMessage,
		stack: config.environment == "production" ? {} : err.stack,
	});
};

module.exports = ErrorHandler;
