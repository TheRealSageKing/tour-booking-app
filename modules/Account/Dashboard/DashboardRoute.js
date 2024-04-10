const express = require("express");
const DashboardController = require("./DashboardController");
const DashboardRoute = express.Router();

DashboardRoute.get("/dashboard", DashboardController.index);

module.exports = DashboardRoute;
