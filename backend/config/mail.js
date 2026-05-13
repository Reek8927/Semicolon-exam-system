const axios = require("axios");

const path = require("path");

const sendMail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {

  try {

    // =========================
    // CONVERT FILES TO BASE64
    // =========================

    const formattedAttachments =
      await Promise.all(

        attachments.map(async (file) => {

          const response =
            await axios.get(file.path, {

              responseType: "arraybuffer"

            });

          const ext =
  path.extname(file.filename);

let mimeType =
  "application/octet-stream";

if (ext === ".pdf") {

  mimeType =
    "application/pdf";

}

if (
  ext === ".png" ||
  ext === ".jpg" ||
  ext === ".jpeg"
) {

  mimeType =
    `image/${ext.replace(".", "")}`;
}

return {

  name: file.filename,

  content:
    Buffer.from(
      response.data
    ).toString("base64"),

  type: mimeType

};

        })

      );

    // =========================
    // SEND EMAIL
    // =========================

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name:
            "Semicolon Exam System",

          email:
            "reekbasu4529@gmail.com"

        },

        to: [

          {
            email: to
          }

        ],

        subject,

        htmlContent: html,

        ...(formattedAttachments.length > 0 && {

          attachment:
            formattedAttachments

        })

      },

      {

        headers: {

          accept:
            "application/json",

          "api-key":
            process.env.BREVO_API_KEY,

          "content-type":
            "application/json"

        }

      }

    );

    console.log("Email Sent");

  } catch (err) {

    console.log("EMAIL ERROR:");

    console.log(
      err.response?.data ||
      err.message
    );

  }

};

module.exports = sendMail;