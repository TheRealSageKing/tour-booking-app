const express = require("express");
const config = require("./config/config");

const router = require("./modules/Home/HomeRoute");
const AuthRouter = require("./modules/Auth/AuthRoute");

const Database = require("./config/database");
const UserSchema = require("./schemas/UserSchema");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", router);
app.use("/auth", AuthRouter);

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
	Database.connect();
});
