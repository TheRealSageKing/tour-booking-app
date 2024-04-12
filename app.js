const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");

const router = require("./modules/Home/HomeRoute");
const AuthRouter = require("./modules/Auth/AuthRoute");

const Database = require("./config/database");
const session = require("express-session");
const DashboardRoute = require("./modules/Admin/Dashboard/DashboardRoute");
const UserDashboardRoute = require("./modules/User/Dashboard/DashboardRoute");
const AuthGuard = require("./middlewares/AuthGuard");
const BookingRoute = require("./modules/Admin/Booking/BookingRoute");
const UserBookingRoute = require("./modules/User/Booking/BookingRoute");
const TourRoute = require("./modules/Admin/Tour/TourRoute");
const AuthUser = require("./middlewares/AuthUser");
const AuthAdmin = require("./middlewares/AuthAdmin");

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

//Admin Account Routes
app.use("/account", AuthGuard, AuthAdmin, DashboardRoute);
app.use("/account", AuthGuard, AuthAdmin, BookingRoute);
app.use("/account/tours", AuthGuard, AuthAdmin, TourRoute);

//User Account Routes
app.use("/user", UserDashboardRoute);
app.use("/user", UserBookingRoute);

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
	Database.connect();
});
