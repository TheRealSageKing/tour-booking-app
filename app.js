const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");

const router = require("./modules/Home/HomeRoute");
const AuthRouter = require("./modules/Auth/AuthRoute");

const Database = require("./config/database");
const session = require("express-session");
const DashboardRoute = require("./modules/Account/Dashboard/DashboardRoute");
const AuthGuard = require("./middlewares/AuthGuard");
const BookingRoute = require("./modules/Account/Booking/BookingRoute");
const TourRoute = require("./modules/Account/Tour/TourRoute");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: config.session_secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: config.environment == "production" || false,
			maxAge: 3600000, // 1hour,
		},
	})
);

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/assets", [express.static(__dirname + "/node_modules/jquery/dist/"), express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")]);

app.use("/", router);
app.use("/auth", AuthRouter);
app.use("/account/tours", TourRoute);
app.use("/account", AuthGuard, DashboardRoute);
app.use("/account", AuthGuard, BookingRoute);

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
	Database.connect();
});
