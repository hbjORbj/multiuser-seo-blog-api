const User = require("../models/User");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

/* 
**
Sign Up
**
*/
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(403)
      .json({ error: "You are an already registered user." });
  } else {
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const newUser = new User({ name, username, email, password, profile });
    newUser.save();
    return res.json({ message: "You're Signed Up! Please Log in and Enjoy!" });
  }
};

/* 
**
Log In
**
*/
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // correct password
    if (user.authenticate(password)) {
      // generate a token using user id and secret whose expiry time is 1 day
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // create a cookie with token whose expiry time is 1 day
      res.cookie("t", token, { expiresIn: "1d" });

      const { _id, name, email, username, profile } = user;
      return res.json({ token, user: { _id, name, username, email, profile } });
    } else {
      return res.status(401).json({ error: "Incorrect password." });
    }
  } else {
    return res.status(401).json({ error: "You are not a registered user." });
  }
};
