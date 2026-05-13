const axios = require("axios");

const sendMail = async ({
  to,
  subject,
  html,
  attachments = []
}) => {

  try {

    const formattedAttachments =
      await Promise.all(

        attachments.map(async (file) => {

          const response =
            await axios.get(file.path, {

              responseType: "arraybuffer"

            });

          return {

            name: file.filename,

            content:
              Buffer.from(
                response.data,
                "binary"
              ).toString("base64")

          };

        })

      );

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Semicolon Exam System",

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

        attachment:
          formattedAttachments

      },

      {

        headers: {

          accept: "application/json",

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

console.log(err);

console.log(err.response?.data);

console.log(err.message);

  }

};

module.exports = sendMail;