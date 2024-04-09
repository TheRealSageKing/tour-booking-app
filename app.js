const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.listen(5001, () => {
	console.log(`app running on http:/\/\localhost:${5001}`);
});
