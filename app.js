const express = require("express");
const config = require("./config/config");
const router = require("./modules/Home/HomeRoute");
const Database = require("./config/database");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", router);

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
	Database.connect();
});
