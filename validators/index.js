const expressJwt = require("express-jwt");

/* 
**
Sign Up Validator 
**
*/
exports.signUpValidator = (req, res, next) => {
  // name
  req.check("name", "Enter your name.").notEmpty();

  // email
  req.check("email", "Enter your email.").notEmpty();
  req.check("email").isEmail().withMessage("Invalid email address.");

  // password
  req.check("password", "Enter your password.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Your password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Your password must contain one or more numbers.");

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Log In Validator 
**
*/
exports.loginValidator = (req, res, next) => {
  // email
  req.check("email", "Enter your email.").notEmpty();
  req.check("email").isEmail().withMessage("Invalid email address.");

  // password
  req.check("password", "Enter your password.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Your password must contain at least 6 characters.")
    .matches(/\d/)
    .withMessage("Your password must contain one or more numbers.");

  // check for errors
  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

/* 
**
Check if user is logged in
**
*/
exports.requireLogin = expressJwt({
  // if token is valid, expressJwt appends to the request object
  // the verified user's id in a key "auth" and move to the next middleware
  // otherwise, it returns authorization error
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
