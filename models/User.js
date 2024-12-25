const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  number: { type: Number, required: true },
  gender: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
