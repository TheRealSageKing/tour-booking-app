const express = require("express");
const config = require("./config/config");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("pages/index");
});

app.listen(config.port, () => {
	console.log(`app running on http:/\/\localhost:${config.port}`);
});
