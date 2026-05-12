const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  examName: String,

  score: String,

  rank: String,

  omrFile: String,

  reportCard: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Exam", examSchema);