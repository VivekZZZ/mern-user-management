const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  password: String,
});

const adminModel = new mongoose.model("admins", adminSchema);

module.exports = adminModel;
