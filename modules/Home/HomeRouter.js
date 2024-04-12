const express = require("express");
const router = express.Router();

router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/contact", HomeController.contact);
router.get("/tours", HomeController.tours);
router.get("/tours/:id", HomeController.tourDetail);
router.get("/book-tour", HomeController.bookTour);

module.exports = router;
