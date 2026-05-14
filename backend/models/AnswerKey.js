const mongoose = require("mongoose");

const answerKeySchema =
  new mongoose.Schema({

    examName: {

      type: String,

      required: true

    },

    fileUrl: {

      type: String,

      required: true

    },

    createdAt: {

      type: Date,

      default: Date.now

    }

  });

module.exports =
  mongoose.model(

    "AnswerKey",

    answerKeySchema

  );