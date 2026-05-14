const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const sendMail = require("../config/mail");

router.post("/register", async (req, res) => {

  const { name, phone, email, parentPhone } = req.body;

  const rollNo = Math.floor(
    100000000 + Math.random() * 900000000
  );

  const student = new Student({
    name,
    phone,
    email,
    parentPhone,
    rollNo
  });

  await student.save();

  res.json(student);

  // SEND EMAIL

await sendMail({

  to: "reekbasu4529@gmail.com",


  subject: "Welcome to Semicolon Coaching",

  html: `

<div style="
  font-family: Arial;
  padding: 20px;
  background: #0b1120;
  color: white;
  border-radius: 12px;
">

  <!-- LOGO -->

  <div style="text-align:center; margin-bottom:30px;">

    <img
      src="${process.env.LOGO_URL}"
      alt="Semicolon Logo"
      style="
        width:120px;
        height:auto;
        border-radius:20px;
      "
    />

  </div>

  <h1 style="color:#38bdf8;">
    Welcome ${name}
  </h1>

  <p>
    Your registration has been completed successfully.
  </p>

  <div style="
    background:#111827;
    padding:20px;
    border-radius:12px;
    margin-top:20px;
  ">

    <h2>Your Roll Number</h2>

    <h1 style="
      color:#22d3ee;
      font-size:40px;
      letter-spacing:4px;
    ">
      ${rollNo}
    </h1>

  </div>

  <p style="margin-top:25px;">
    Please keep this roll number safe.
  </p>

  <br/>

  <p>
    Regards,<br/>
    Semicolon Coaching
  </p>

</div>

`

});

});

router.get("/", async (req, res) => {

  const students = await Student.find();

  res.json(students);

});

router.get("/:rollNo", async (req, res) => {

  const student = await Student.findOne({
    rollNo: req.params.rollNo
  });

  res.json(student);

});

router.delete(

  "/:id",

  async (req, res) => {

    try {

      await Student.findByIdAndDelete(

        req.params.id

      );

      res.json({

        message:
          "Student Deleted"

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Delete Failed"

      });

    }

  }

);

module.exports = router;