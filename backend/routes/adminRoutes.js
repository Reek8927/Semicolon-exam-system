const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// =========================
// ADMIN LOGIN
// =========================

router.post(

  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // =========================
      // FIND ADMIN
      // =========================

      const admin =
        await Admin.findOne({ email });

      if (!admin) {

        return res.status(400).json({

          message:
            "Invalid Email"

        });

      }

      // =========================
      // CHECK PASSWORD
      // =========================

      const isMatch =
        await bcrypt.compare(

          password,

          admin.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Invalid Password"

        });

      }

      // =========================
      // GENERATE TOKEN
      // =========================

      const token =
        jwt.sign(

          {

            id: admin._id

          },

          process.env.JWT_SECRET,

          {

            expiresIn: "7d"

          }

        );

      // =========================
      // RESPONSE
      // =========================

      res.json({

        message:
          "Login Successful",

        token

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  }

);

module.exports = router;