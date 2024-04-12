const express = require("express");
const BookingController = require("./BookingController");
const BookingRoute = express.Router();

BookingRoute.get("/bookings", BookingController.index);

module.exports = BookingRoute;
