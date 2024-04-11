const config = require("../../../config/config");
const Tour = require("../../../schemas/TourSchema");

class TourController {
	//list all the available tours
	async index(req, res, next) {
		const tours = await Tour.find().exec();
		console.log(tours);
		res.render("pages/backend/list-tours", { tours, baseUrl: config.baseUrl });
	}

	//shows the create tour form
	create(req, res, next) {
		res.render("pages/backend/create-tour");
	}

	//saves a new tour
	async store(req, res, next) {
		try {
			const { locations, name, description, country, cost, discount } = req.body;

			const files = req.files;
			const screenshots = files.map((file) => file.path);
			const location = locations.split(",");

			const tour = await Tour.create({
				name,
				description,
				country,
				locations: location,
				images: screenshots,
				cost,
				discount,
			});

			res.status(201).json({ success: true, message: "Tour was created", data: tour });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TourController();
