require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

// =========================
// CONNECT DB
// =========================

mongoose.connect(

  process.env.MONGO_URI

).then(async () => {

  console.log("MongoDB Connected");

  // =========================
  // HASH PASSWORD
  // =========================

  const hashedPassword =
    await bcrypt.hash(

      "admin123",

      10

    );

  // =========================
  // CREATE ADMIN
  // =========================

  const admin = new Admin({

    email:
      "admin@semicolon.com",

    password:
      hashedPassword

  });

  await admin.save();

  console.log(
    "Admin Created Successfully"
  );

  process.exit();

}).catch((err) => {

  console.log(err);

});