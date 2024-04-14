const express = require("express");
const config = require("./config/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const redisClient = require("redis").createClient();
const RedisStore = require("connect-redis").default;

const HomeRoute = require("./modules/Home/HomeRoute");
const AuthRouter = require("./modules/Auth/AuthRoute");

const Database = require("./config/database");
const DashboardRoute = require("./modules/Admin/Dashboard/DashboardRoute");
const UserDashboardRoute = require("./modules/User/Dashboard/DashboardRoute");
const AuthGuard = require("./middlewares/AuthGuard");
const BookingRoute = require("./modules/Admin/Booking/BookingRoute");
const UserBookingRoute = require("./modules/User/Booking/BookingRoute");
const TourRoute = require("./modules/Admin/Tour/TourRoute");
const AuthUser = require("./middlewares/AuthUser");
const AuthAdmin = require("./middlewares/AuthAdmin");

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolver");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const ErrorHandler = require("./middlewares/ErrorHandler");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

redisClient.connect().catch(console.error);

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: config.session_secret,
		cookie: {
			maxAge: 3600000, // 1hour,
		},
	})
);

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/assets", [express.static(__dirname + "/node_modules/jquery/dist/"), express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")]);
app.use(cors());

app.use("/", HomeRoute);
app.use("/auth", AuthRouter);

//Admin Account Routes
app.use("/account", AuthGuard, AuthAdmin, DashboardRoute);
app.use("/account", AuthGuard, AuthAdmin, BookingRoute);
app.use("/account/tours", AuthGuard, AuthAdmin, TourRoute);

//User Account Routes
app.use("/user", AuthGuard, AuthUser, UserDashboardRoute);
app.use("/user", AuthGuard, AuthUser, UserBookingRoute);

//import graphql
async function startApp(app) {
	const server = new ApolloServer({
		typeDefs: schema,
		resolvers,
	});

	await server.start(); // Wait for the server to be ready
	app.use("/graphql", expressMiddleware(server)); // Register the middleware after server starts

	// app.use(ErrorHandler);

	app.use("*", (req, res, next) => {
		res.render("pages/404", { active: "" });
	});

	app.listen(config.port, () => {
		console.log("Apollo is running");
		console.log(`app running on http:/\/\localhost:${config.port}`);
		Database.connect();
	});
}

startApp(app);
