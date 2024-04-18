const mongoose = require("mongoose");

class Database {
	static async connect() {
		try {
			const connected = await mongoose.connect("mongodb://mongo:27017/tours-db");
			if (connected) {
				console.log("connected to database successfully");
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Database;
