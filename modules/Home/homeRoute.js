const express = require("express");
const homeController = require("./HomeController");

const router = express.Router();

router.get("/", homeController.index);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);
router.get("/book-tour", homeController.bookTour);

module.exports = router;
