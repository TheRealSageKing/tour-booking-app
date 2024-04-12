const express = require("express");
const TourController = require("./TourController");
const upload = require("../../../middlewares/Upload");
const TourRoute = express.Router();

TourRoute.get("/", TourController.index);
TourRoute.get("/create", TourController.create);
TourRoute.post("/create", upload.array("screenshots"), TourController.store);
TourRoute.post("/:id/delete", TourController.delete);
TourRoute.get("/:id/edit", TourController.edit);
TourRoute.post("/:id/edit", upload.array("screenshots"), TourController.update);
TourRoute.post("/:id/toggle-active", TourController.toggleActive);

module.exports = TourRoute;
