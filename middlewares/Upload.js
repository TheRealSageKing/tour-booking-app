const multer = require("multer");

const storage = multer.diskStorage({
	destination: "uploads/tours/", // Define the directory for uploaded images
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
	},
});

const upload = multer({ storage });

module.exports = upload;
