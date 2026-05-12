const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const Exam = require("../models/Exam");

const Student = require("../models/Student");

const transporter = require("../config/mail");

router.post(
  "/upload",
  upload.fields([
    { name: "omrFile" },
    { name: "reportCard" }
  ]),

  async (req, res) => {

    const {
      studentId,
      examName,
      score,
      rank
    } = req.body;

    const exam = new Exam({

      studentId,

      examName,

      score,

      rank,

      omrFile: req.files["omrFile"]
        ? req.files["omrFile"][0].filename
        : "",

      reportCard: req.files["reportCard"]
        ? req.files["reportCard"][0].filename
        : ""

    });

    await exam.save();

    res.json({
      message: "Files Uploaded",
      exam
    });

    const student = await Student.findById(studentId);

// =========================
// SEND OMR MAIL
// =========================

if (req.files?.omrFile?.[0]) {

  await transporter.sendMail({

    from: process.env.EMAIL,

    to: student.email,

    subject: `OMR Uploaded - ${examName}`,

    html: `

      <h2>Hello ${student.name}</h2>

      <p>Your OMR sheet has been uploaded.</p>

      <p><strong>Exam:</strong> ${examName}</p>

      <p>Please find the OMR attached.</p>

      <br/>

      <p>Regards,<br/>Semicolon Coaching</p>

    `,

    attachments: [

      {

        filename:
          req.files.omrFile[0].filename,

        path:
          `uploads/${req.files.omrFile[0].filename}`

      }

    ]

  });

}

// =========================
// SEND REPORT CARD MAIL
// =========================

if (req.files?.reportCard?.[0]) {

  await transporter.sendMail({

    from: process.env.EMAIL,

    to: student.email,

    subject: `Report Card Uploaded - ${examName}`,

    html: `

      <h2>Hello ${student.name}</h2>

      <p>Your report card has been uploaded.</p>

      <p><strong>Exam:</strong> ${examName}</p>

      <p><strong>Score:</strong> ${score}</p>

      <p><strong>Rank:</strong> ${rank}</p>

      <p>Please find the report card attached.</p>

      <br/>

      <p>Regards,<br/>Semicolon Coaching</p>

    `,

    attachments: [

      {

        filename:
          req.files.reportCard[0].filename,

        path:
          `uploads/${req.files.reportCard[0].filename}`

      }

    ]

  });

}

  }
);

router.get("/:studentId", async (req, res) => {

  const exams = await Exam.find({
    studentId: req.params.studentId
  });

  res.json(exams);

});

module.exports = router;