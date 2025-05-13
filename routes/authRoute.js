const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

// POST method for sign up
authRouter.post("/signup", authController.postCreateUser);

// POST method to log in
authRouter.post("/login", authController.postUserLogin);

module.exports = authRouter;