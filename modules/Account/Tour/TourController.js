const config = require("../../../config/config");
const Tour = require("../../../schemas/TourSchema");
const countries = require("../../../country.json");

class TourController {
	//list all the available tours
	async index(req, res, next) {
		const tours = await Tour.find().exec();
		console.log(tours);
		res.render("pages/backend/list-tours", { tours, baseUrl: config.baseUrl });
	}

	//shows the create tour form
	create(req, res, next) {
		res.render("pages/backend/create-tour", { countries });
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

	async delete(req, res, next) {
		try {
			const tour = await Tour.findOne({ _id: req.params.id }).exec();
			await tour.delete();

			res.redirect("/account/tours");
		} catch (error) {
			next(error);
		}
	}

	async edit(req, res, next) {
		try {
			const tour = await Tour.findOne({ _id: req.params.id }).exec();
			res.render("pages/backend/create-tour", { countries, tour });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const tour = await Tour.findOne({ _id: req.params.id }).exec();

			if (!tour) {
				throw new Error("Tour was not found");
			}

			const files = req.files;
			const screenshots = files.map((file) => file.path);
			const location = locations.split(",");

			//TODO delete previous images

			tour.name = req.body.name;
			tour.description = req.body.description;
			tour.country = req.body.country;
			tour.images = screenshots;
			tour.locations = location;
			tour.cost = req.body.cost;
			tour.discount = req.body.discount;

			tour.save();

			res.render("pages/backend/create-tour", { success: true, message: "Tour was updated successfully" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TourController();
