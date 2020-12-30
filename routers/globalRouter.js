const express = require("express");
const { login, signUp } = require("../controllers/globalController");
const { loginValidator, signUpValidator } = require("../validators");

const globalRouter = express.Router();

// POST method
globalRouter.post("/login", loginValidator, login);
globalRouter.post("/signUp", signUpValidator, signUp);

module.exports = globalRouter;
