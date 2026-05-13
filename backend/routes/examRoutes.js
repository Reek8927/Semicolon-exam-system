const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const Exam = require("../models/Exam");

const Student = require("../models/Student");

const sendMail = require("../config/mail");

router.post(

  "/upload",

  upload.fields([
    { name: "omrFile" },
    { name: "reportCard" }
  ]),

  async (req, res) => {

    try {

      const {
        studentId,
        examName,
        score,
        rank
      } = req.body;

      // =========================
      // DEBUG
      // =========================

      console.log(req.files);

      // =========================
      // CREATE EXAM
      // =========================

      const exam = new Exam({

        studentId,

        examName,

        score,

        rank,

        omrFile: req.files?.omrFile?.[0]?.path || "",

        reportCard:
          req.files?.reportCard?.[0]?.path || ""

      });

      await exam.save();

      // =========================
      // FIND STUDENT
      // =========================

      const student = await Student.findById(studentId);

      // =========================
      // SEND OMR MAIL
      // =========================

      if (req.files?.omrFile?.[0]) {

        await sendMail({

  to: student.email,


          subject: `OMR Uploaded - ${examName}`,

          html: `

            <div style="
              font-family: Arial;
              padding: 20px;
              background: #0b1120;
              color: white;
              border-radius: 12px;
            ">

              <div style="text-align:center; margin-bottom:30px;">

                <img
                  src="${process.env.LOGO_URL}"
                  alt="Semicolon Logo"
                  style="
                    width:120px;
                    border-radius:20px;
                  "
                />

              </div>

              <h2>Hello ${student.name}</h2>

              <p>Your OMR sheet has been uploaded.</p>

              <p><strong>Exam:</strong> ${examName}</p>

              <p>Your OMR sheet is ready.</p>

<a
  href="${req.files.omrFile[0].path}"
  style="
    display:inline-block;
    margin-top:20px;
    padding:12px 24px;
    background:#3b82f6;
    color:white;
    text-decoration:none;
    border-radius:10px;
    font-weight:bold;
  "
>
  View OMR
</a>

              <br/>

              <p>
                Regards,<br/>
                Semicolon Coaching
              </p>

            </div>

          `,

          

        });

      }

      // =========================
      // SEND REPORT CARD MAIL
      // =========================

      if (req.files?.reportCard?.[0]) {

        await sendMail({

  to: student.email,

          subject:
            `Report Card Uploaded - ${examName}`,

          html: `

            <div style="
              font-family: Arial;
              padding: 20px;
              background: #0b1120;
              color: white;
              border-radius: 12px;
            ">

              <div style="text-align:center; margin-bottom:30px;">

                <img
                  src="${process.env.LOGO_URL}"
                  alt="Semicolon Logo"
                  style="
                    width:120px;
                    border-radius:20px;
                  "
                />

              </div>

              <h2>Hello ${student.name}</h2>

              <p>Your report card has been uploaded.</p>

              <p><strong>Exam:</strong> ${examName}</p>

              <p><strong>Score:</strong> ${score}</p>

              <p><strong>Rank:</strong> ${rank}</p>

              <p>Your report card is ready.</p>

<a
  href="${req.files.reportCard[0].path}"
  style="
    display:inline-block;
    margin-top:20px;
    padding:12px 24px;
    background:#06b6d4;
    color:white;
    text-decoration:none;
    border-radius:10px;
    font-weight:bold;
  "
>
  Download Report Card
</a>

              <br/>

              <p>
                Regards,<br/>
                Semicolon Coaching
              </p>

            </div>

          `,

          

        });

      }

      // =========================
      // RESPONSE
      // =========================

      res.json({

        message: "Files Uploaded Successfully",

        exam

      });

    } catch (err) {

      console.error(err);

      res.status(500).json({

        message: "Upload Failed"

      });

    }

  }

);

router.get("/:studentId", async (req, res) => {

  try {

    const exams = await Exam.find({
      studentId: req.params.studentId
    });

    res.json(exams);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch exams"
    });

  }

});

module.exports = router;