const express = require("express");
const HomeController = require("./HomeController");
const HomeRoute = express.Router();

HomeRoute.get("/", HomeController.index);
HomeRoute.get("/about", HomeController.about);
HomeRoute.get("/contact", HomeController.contact);
HomeRoute.get("/tours", HomeController.tours);
HomeRoute.get("/tours/:id", HomeController.tourDetail);
HomeRoute.get("/book-tour", HomeController.bookTour);

module.exports = HomeRoute;
