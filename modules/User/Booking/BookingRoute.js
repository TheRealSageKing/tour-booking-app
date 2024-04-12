const express = require("express");
const BookingController = require("./BookingController");
const BookingRoute = express.Router();

BookingRoute.get("/book-tour", BookingController.bookTour);
BookingRoute.post("/book-tour", BookingController.store);
BookingRoute.get("/bookings", BookingController.bookings);

module.exports = BookingRoute;
