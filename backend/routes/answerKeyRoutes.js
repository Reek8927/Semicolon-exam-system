const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const AnswerKey =
  require("../models/AnswerKey");

const Student =
  require("../models/Student");

const sendMail =
  require("../config/mail");

// =========================
// UPLOAD ANSWER KEY
// =========================

router.post(

  "/upload",

  upload.single("file"),

  async (req, res) => {

    try {

      const { examName } =
        req.body;

      // =========================
      // SAVE ANSWER KEY
      // =========================

      const answerKey =
        new AnswerKey({

          examName,

          fileUrl:
            req.file.path

        });

      await answerKey.save();

      // =========================
      // GET ALL STUDENTS
      // =========================

      const students = [

  {
    name: "Reek Basu",
    email:
      "reekbasu4529@gmail.com"
  }

];

      // =========================
      // SEND MAIL TO ALL
      // =========================

      for (const student of students) {

        await sendMail({

          to: "reekbasu4529@gmail.com",

          subject:
            `${examName} Final Answer Key Released`,

          html: `

            <div style="
              font-family: Arial;
              padding: 20px;
              background: #0b1120;
              color: white;
              border-radius: 12px;
            ">

              <div style="
                text-align:center;
                margin-bottom:30px;
              ">

                <img
                  src="${process.env.LOGO_URL}"
                  width="120"
                />

              </div>

              <h2>
                Hello ${student.name}
              </h2>

              <p>
                Final answer key has been released.
              </p>

              <p>
                <strong>Exam:</strong>
                ${examName}
              </p>

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
                "Final-Answer-Key.pdf",

              path:
                req.file.path

            }

          ]

        });

      }

      res.json({

        message:
          "Answer Key Uploaded & Emails Sent"

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Upload Failed"

      });

    }

  }

);

module.exports = router;