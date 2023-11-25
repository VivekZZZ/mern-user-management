const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  company: String,
});

const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;
