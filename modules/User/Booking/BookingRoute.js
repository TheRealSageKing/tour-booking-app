const express = require("express");
const BookingController = require("./BookingController");
const BookingRoute = express.Router();

BookingRoute.get("/book-tour", BookingController.bookTour);

module.exports = BookingRoute;
