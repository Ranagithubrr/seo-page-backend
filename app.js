const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const todos = require("./data");
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json("backend running");
});
app.get("/todos", (req, res) => {
  res.json(todos);
});
app.post("/add-file", (req, res) => {
  const { userId, fileNames } = req.body;
  const task = todos.find((todo) => todo.userId === userId);

  if (!task) {
    return res
      .status(404)
      .json({ message: "Task not found for the provided user ID" });
  }

  // Add all files to the files array and update fileCount
  task.files.push(...fileNames);
  task.fileCount = task.files.length;

  return res.status(200).json({ message: "Files added successfully", task });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
