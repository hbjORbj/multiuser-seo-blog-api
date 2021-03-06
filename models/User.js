const mongoose = require("mongoose");
const { v1 } = require("uuid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  profile: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  hashedPassword: {
    type: String,
    trim: true,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

// virtual fields
UserSchema.virtual("password")
  .set(function (password) {
    // create a temp variable called _password
    this._password = password;

    // generate a timestamp
    this.salt = v1();

    // encrypt password
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
UserSchema.methods = {
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
