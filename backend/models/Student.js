const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  parentPhone: String,
  rollNo: String
});

module.exports = mongoose.model("Student", studentSchema);