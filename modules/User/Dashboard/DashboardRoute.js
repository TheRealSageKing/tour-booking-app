const express = require("express");
const DashboardRoute = express.Router();

DashboardRoute.get("/dashboard", (req, res, next) => {
	res.render("pages/user/dashboard");
});

module.exports = DashboardRoute;
