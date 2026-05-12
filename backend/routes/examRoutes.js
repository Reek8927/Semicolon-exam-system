const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const Exam = require("../models/Exam");

const Student = require("../models/Student");

const resend = require("../config/mail");

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

        await resend.emails.send({

  from: "onboarding@resend.dev",

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

              <p>Please find the OMR attached.</p>

              <br/>

              <p>
                Regards,<br/>
                Semicolon Coaching
              </p>

            </div>

          `,

          attachments: [

            {

              filename:
                req.files.omrFile[0].originalname,

              path:
                req.files.omrFile[0].path

            }

          ]

        });

      }

      // =========================
      // SEND REPORT CARD MAIL
      // =========================

      if (req.files?.reportCard?.[0]) {

        await resend.emails.send({

  from: "onboarding@resend.dev",

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

              <p>Please find the report card attached.</p>

              <br/>

              <p>
                Regards,<br/>
                Semicolon Coaching
              </p>

            </div>

          `,

          attachments: [

            {

              filename:
                req.files.reportCard[0].originalname,

              path:
                req.files.reportCard[0].path

            }

          ]

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