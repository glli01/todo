import express from "express"; //importing server dependency
import tasks from "./data/tasks.js"; //importing data
import lists from "./data/lists.js"; //import lists
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDB(); //connects to mongoDB

const app = express(); //call method express and set to app;
const PORT = 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); //listening to requests on port 5000.

app.get("/", (req, res) => {
  res.send("API is running...");
}); //= get request at localhost:3000/

app.get("/api/tasks", (req, res) => {
  console.log("all tasks displayed");
  res.json(tasks);
});

app.get("/api/lists", (req, res) => {
  console.log("GET request to /api/lists");
  res.json(lists);
});

app.get("/api/lists/:id", (req, res) => {
  console.log(`GET request to /api/lists/${req.params.id}`);
  res.json(lists.find((list) => list._id === Number(req.params.id)));
});

app.get("/api/tasks/:id", (req, res) => {
  console.log(`GET request to /api/tasks/${req.params.id}`);
  res.json(tasks.find((task) => task._id === Number(req.params.id)));
});
