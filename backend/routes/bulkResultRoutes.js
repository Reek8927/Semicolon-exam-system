const express = require("express");

const router = express.Router();

const multer = require("multer");

const XLSX = require("xlsx");

const Student =
  require("../models/Student");

const Exam =
  require("../models/Exam");

const generateReportCard =
  require("../utils/generateReportCard");

const uploadBufferToCloudinary =
  require(

    "../utils/uploadBufferToCloudinary"

  );

const sendMail =
  require("../config/mail");

// =========================
// MEMORY STORAGE
// =========================

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });

// =========================
// BULK RESULT UPLOAD
// =========================

router.post(

  "/upload",

  upload.single("file"),

  async (req, res) => {

    try {

      const {

        examName

      } = req.body;

      // =========================
      // READ EXCEL
      // =========================

      const workbook =
        XLSX.read(

          req.file.buffer,

          {

            type: "buffer"

          }

        );

      const sheetName =
        workbook.SheetNames[0];

      const sheet =
        workbook.Sheets[sheetName];

      const data =
        XLSX.utils.sheet_to_json(
          sheet
        );

      // =========================
      // PROCESS EACH STUDENT
      // =========================

      for (const row of data) {

        // =========================
        // FIND STUDENT
        // =========================

        const student =
          await Student.findOne({

            rollNo:
              row.RollNo

          });

        if (!student) {

          console.log(

            `Student Not Found: ${row.RollNo}`

          );

          continue;

        }

        // =========================
        // CALCULATE
        // =========================

        const percentage = (

          row.Marks /

          row.TotalMarks

        ) * 100;

        // =========================
        // GRADE
        // =========================

        let grade = "D";

        if (percentage >= 90)
          grade = "A+";

        else if (
          percentage >= 80
        )
          grade = "A";

        else if (
          percentage >= 70
        )
          grade = "B";

        else if (
          percentage >= 60
        )
          grade = "C";

        // =========================
        // PERFORMANCE
        // =========================

        let performance =
          "Needs Improvement";

        if (percentage >= 90)
          performance =
            "Excellent";

        else if (
          percentage >= 75
        )
          performance =
            "Good";

        else if (
          percentage >= 50
        )
          performance =
            "Average";

        // =========================
        // GENERATE PDF
        // =========================

        const pdfBuffer =
          await generateReportCard({

            name:
              student.name,

            rollNo:
              student.rollNo,

            examName,

            marks:
              row.Marks,

            totalMarks:
              row.TotalMarks,

            percentage:
              percentage.toFixed(2),

            rank:
              row.Rank,

            grade,

            performance

          });

        // =========================
        // UPLOAD PDF
        // =========================

        const uploadResult =
          await uploadBufferToCloudinary(

            pdfBuffer,

            `${student.rollNo}-${examName}`

          );

        // =========================
        // SAVE EXAM
        // =========================

        const exam =
          new Exam({

            studentId:
              student._id,

            examName,

            score:
              row.Marks,

            rank:
              row.Rank,

            reportCard:
              uploadResult.secure_url

          });

        await exam.save();

        // =========================
        // SEND EMAIL
        // =========================

        await sendMail({

          to:
            student.email,

          subject:
            `${examName} Result Declared`,

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
                Your result has been declared.
              </p>

              <p>
                <strong>Exam:</strong>
                ${examName}
              </p>

              <p>
                <strong>Marks:</strong>
                ${row.Marks}
              </p>

              <p>
                <strong>Rank:</strong>
                ${row.Rank}
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
                `${student.rollNo}-ReportCard.pdf`,

              path:
                uploadResult.secure_url

            }

          ]

        });

        console.log(

          `Processed: ${student.rollNo}`

        );

      }

      res.json({

        message:
          "Bulk Result Processing Completed"

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Bulk Upload Failed"

      });

    }

  }

);

module.exports = router;