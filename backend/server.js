import express from "express"; //importing server dependency
import tasks from "./data/tasks.js"; //importing data

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
