import express from "express"; //importing server dependency
import tasks from "./data/tasks.js"; //importing data
import lists from "./data/lists.js"; //import lists
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import List from "./models/listModel.js";
import Task from "./models/taskModel.js";
import User from "./models/userModel.js";
dotenv.config();

connectDB(); //connects to mongoDB

const app = express(); //call method express and set to app;
const PORT = 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); //listening to requests on port 5000.

app.get("/", (req, res) => {
  res.send("API is running...");
}); //= get request at localhost:3000/

app.get("/api/tasks", async (req, res) => {
  try {
    console.log("all tasks displayed");
    const query = await Task.find({});
    res.json(query);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});

app.get("/api/lists", async (req, res) => {
  try {
    console.log("GET request to /api/lists");
    const response = await List.find({});
    res.json(response);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});

app.get("/api/lists/:id", async (req, res) => {
  try {
    console.log(`GET request to /api/lists/${req.params.id}`);
    const response = await List.findOne({ _id: req.params.id });
    res.json(response);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    console.log(`GET request to /api/tasks/${req.params.id}`);
    const response = await Task.findOne({ _id: req.params.id });
    res.json(response);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});
