const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://sneha:VPs0dg8zNOCDzZEm@cluster0.6j3oof4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Form = mongoose.model("Form", {
  username: String,
  email: String,
  total_task_completed: String,
  experience: String,
  problem: String,
  suggestion: String,
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      email,
      total_task_completed,
      experience,
      problem,
      suggestion,
    } = req.body.formData;
    console.log(
      username,
      email,
      total_task_completed,
      experience,
      problem,
      suggestion
    );
    const item = await Form.create({
      username,
      email,
      total_task_completed,
      experience,
      problem,
      suggestion,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Could not create item" });
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
