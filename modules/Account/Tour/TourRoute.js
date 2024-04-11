const express = require("express");
const TourController = require("./TourController");
const upload = require("../../../middlewares/Upload");
const TourRoute = express.Router();

TourRoute.get("/", TourController.index);
TourRoute.get("/create", TourController.create);
TourRoute.post("/create", upload.array("screenshots"), TourController.store);
TourRoute.get("/:id/delete", TourController.delete);
TourRoute.get("/:id/edit", TourController.edit);
TourRoute.post("/:id/edit", TourController.update);

module.exports = TourRoute;
