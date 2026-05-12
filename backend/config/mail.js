const axios = require("axios");

const sendMail = async ({
  to,
  subject,
  html
}) => {

  try {

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Semicolon Exam System",

          email: "reekbasu4529@gmail.com"

        },

        to: [

          {
            email: to
          }

        ],

        subject,

        htmlContent: html

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

    console.log(
      err.response?.data || err.message
    );

  }

};

module.exports = sendMail;