const mongoose = require("mongoose");

class Database {
	static async connect() {
		try {
			const connected = await mongoose.connect("mongodb://127.0.0.1:27017/tours-db");
			if (connected) {
				console.log("connected to database successfully");
			}
		} catch (error) {
			throw next(error);
		}
	}
}

module.exports = Database;
