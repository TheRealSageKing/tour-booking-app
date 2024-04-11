const express = require("express");
const TourController = require("./TourController");
const upload = require("../../../middlewares/Upload");
const TourRoute = express.Router();

TourRoute.get("/", TourController.index);
TourRoute.get("/create", TourController.create);
TourRoute.post("/create", upload.array("screenshots"), TourController.store);

module.exports = TourRoute;
