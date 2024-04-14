class AppError extends Error {
	constructor(errorMessage, errorCode, errorStatusCode) {
		super(errorMessage);
		this.message = errorMessage;
		this.statusCode = errorStatusCode;
		this.errorCode = errorCode;
	}
}
