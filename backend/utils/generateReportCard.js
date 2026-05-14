const PDFDocument =
  require("pdfkit");

const QRCode =
  require("qrcode");

const axios =
  require("axios");

// =========================
// GENERATE REPORT CARD
// =========================

const generateReportCard =
  async (studentData) => {

    return new Promise(

      async (resolve, reject) => {

        try {

          const doc =
            new PDFDocument({

              size: "A4",

              margin: 50

            });

          // =========================
          // BUFFER
          // =========================

          const buffers = [];

          doc.on(

            "data",

            buffers.push.bind(buffers)

          );

          doc.on(

            "end",

            () => {

              const pdfData =
                Buffer.concat(buffers);

              resolve(pdfData);

            }

          );

          // =========================
          // BACKGROUND
          // =========================

          doc.rect(
            0,
            0,
            doc.page.width,
            doc.page.height
          )

          .fill("#0b1120");

          // =========================
          // LOGO
          // =========================

          try {

            const logoResponse =
              await axios.get(

                process.env.LOGO_URL,

                {

                  responseType:
                    "arraybuffer"

                }

              );

            const logoBuffer =
              Buffer.from(

                logoResponse.data

              );

            doc.image(

              logoBuffer,

              50,

              40,

              {

                width: 80

              }

            );

          } catch (err) {

            console.log(
              "Logo Load Failed"
            );

          }

          // =========================
          // HEADER
          // =========================

          doc
            .fillColor("white")
            .fontSize(28)
            .font("Helvetica-Bold")
            .text(

              "SEMICOLON COACHING",

              150,

              50

            );

          doc
            .fontSize(16)
            .fillColor("#9ca3af")
            .text(

              "EXAM REPORT CARD",

              150,

              90

            );

          // =========================
          // LINE
          // =========================

          doc.moveTo(50, 140)
            .lineTo(545, 140)
            .strokeColor("#334155")
            .stroke();

          // =========================
          // STUDENT INFO
          // =========================

          doc
            .fontSize(20)
            .fillColor("white")
            .text(

              "Student Details",

              50,

              170

            );

          doc
            .fontSize(14)
            .fillColor("#d1d5db")

            .text(

              `Name: ${studentData.name}`,

              60,

              210

            )

            .text(

              `Roll No: ${studentData.rollNo}`,

              60,

              240

            )

            .text(

              `Exam: ${studentData.examName}`,

              60,

              270

            );

          // =========================
          // RESULT BOX
          // =========================

          doc.roundedRect(
            50,
            330,
            495,
            180,
            20
          )

          .fill("#111827");

          doc
            .fillColor("white")
            .fontSize(22)
            .text(

              "Performance",

              70,

              355

            );

          // =========================
          // MARKS
          // =========================

          doc
            .fontSize(16)
            .fillColor("#d1d5db")

            .text(

              `Marks: ${studentData.marks}`,

              80,

              400

            )

            .text(

              `Total Marks: ${studentData.totalMarks}`,

              80,

              435

            )

            .text(

              `Percentage: ${studentData.percentage}%`,

              80,

              470

            );

          // =========================
          // RIGHT SIDE
          // =========================

          doc
            .fontSize(16)

            .text(

              `Rank: ${studentData.rank}`,

              320,

              400

            )

            .text(

              `Grade: ${studentData.grade}`,

              320,

              435

            )

            .text(

              `Performance: ${studentData.performance}`,

              320,

              470

            );

          // =========================
          // QR CODE
          // =========================

          const qrData =
            `${process.env.FRONTEND_URL}/student/${studentData.rollNo}`;

          const qrImage =
            await QRCode.toDataURL(

              qrData

            );

          const qrBuffer =
            Buffer.from(

              qrImage.split(",")[1],

              "base64"

            );

          doc.image(

            qrBuffer,

            420,

            170,

            {

              width: 100

            }

          );

          // =========================
          // FOOTER
          // =========================

          doc
            .fontSize(12)
            .fillColor("#9ca3af")
            .text(

              "This is a computer generated report card.",

              50,

              730

            );

          doc
            .text(

              "Powered by Semicolon Exam System",

              50,

              750

            );

          // =========================
          // END
          // =========================

          doc.end();

        } catch (err) {

          reject(err);

        }

      }

    );

};

module.exports =
  generateReportCard;