const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");

const router = require("./modules/Home/HomeRoute");
const AuthRouter = require("./modules/Auth/AuthRoute");

const Database = require("./config/database");
const UserSchema = require("./schemas/UserSchema");
const session = require("express-session");
const DashboardRoute = require("./modules/Account/Dashboard/DashboardRoute");
const AuthGuard = require("./middlewares/AuthGuard");
const BookingRoute = require("./modules/Account/Booking/BookingRoute");

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
app.use("/assets", [express.static(__dirname + "/node_modules/jquery/dist/")]);

app.use("/", router);
app.use("/auth", AuthRouter);
app.use("/account", AuthGuard, DashboardRoute);
app.use("/account", AuthGuard, BookingRoute);

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
	Database.connect();
});
