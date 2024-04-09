const express = require("express");
const AuthController = require("./AuthController");
const AuthRouter = express.Router();

AuthRouter.get("/login", AuthController.login);
AuthRouter.get("/signup", AuthController.signUp);
AuthRouter.get("/reset-password", AuthController.reset);

module.exports = AuthRouter;
