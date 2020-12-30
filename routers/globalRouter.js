const express = require("express");
const { login, logout, signUp } = require("../controllers/globalController");
const { loginValidator, signUpValidator } = require("../validators");

const globalRouter = express.Router();

// GET method
globalRouter.get("/logout", logout);

// POST method
globalRouter.post("/login", loginValidator, login);
globalRouter.post("/signUp", signUpValidator, signUp);

module.exports = globalRouter;
