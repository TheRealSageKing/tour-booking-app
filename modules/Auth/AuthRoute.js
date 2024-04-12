const express = require("express");
const AuthController = require("./AuthController");
const AuthRouter = express.Router();

AuthRouter.get("/login", AuthController.login);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.get("/signup", AuthController.signUp);
AuthRouter.post("/signup", AuthController.createUser);
AuthRouter.get("/reset-password", AuthController.reset);
AuthRouter.get("/logout", AuthController.logout);
AuthRouter.get("/reset-admin", AuthController.defaultAdmin);

module.exports = AuthRouter;
