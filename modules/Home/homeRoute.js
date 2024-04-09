const express = require("express");
const homeController = require("./homeController");

const router = express.Router();

router.get("/", homeController.index);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);

module.exports = router;
