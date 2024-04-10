const express = require("express");
const AuthController = require("./AuthController");
const AuthRouter = express.Router();

AuthRouter.get("/login", AuthController.login);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.get("/signup", AuthController.signUp);
AuthRouter.post("/signup", AuthController.createUser);
AuthRouter.get("/reset-password", AuthController.reset);

module.exports = AuthRouter;
