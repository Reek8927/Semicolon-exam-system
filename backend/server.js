const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const adminRoutes = require("./routes/adminRoutes");

const studentRoutes = require("./routes/studentRoutes");

const examRoutes = require("./routes/examRoutes");

const answerKeyRoutes = require("./routes/answerKeyRoutes");

const bulkUploadRoutes = require("./routes/bulkUploadRoutes");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});



app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);



app.use("/api/exams", examRoutes);

app.use("/api/answer-key", answerKeyRoutes);

app.use("/api/bulk-upload", bulkUploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

