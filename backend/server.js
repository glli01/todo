import express from "express"; //importing server dependency
import tasks from "./data/tasks.js"; //importing data
import lists from "./data/lists.js"; //import lists
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import List from "./models/listModel.js";
import Password from "./models/passwordModel.js";
import Task from "./models/taskModel.js";
import User from "./models/userModel.js";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "./middleware/error.js";
dotenv.config();

connectDB(); //connects to mongoDB

const app = express(); //call method express and set to app;
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getToken = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

app.get("/", (req, res, next) => {
  try {
    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (token) {
      res.send(
        `API is running and token is detected...\nToken is: \n Email: ${
          decodedToken.email
        }, \n Id: ${decodedToken.id} \n Expired: ${
          Date.now() >= decodedToken.exp * 1000
        }`
      );
    } else res.send("API is running...");
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.log(`No Web token`);
      next(error);
    } else {
      console.log(`Error: ${error.name} \n ${error.message}`);
      res.send(`API is running... \n Authorization Issue: ${error.message}`);
    }
  }
}); //= get request at localhost:3000/

app.get("/api/tasks", async (req, res, next) => {
  try {
    console.log("GET request to /api/tasks");
    const token = getToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const query = await Task.find({});
    res.json(query);
  } catch (error) {
    next(error);
    console.error(`${error.name} Error: ${error.message}`);
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

//returns user object with hash value.
app.get("/login/", async (req, res) => {
  if (req.query.email) {
    try {
      console.log(`GET request to /login/${req.query.email}`);
      const response = await User.findOne({ email: req.query.email });
      res.json(response);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.send(`Error: ${error.message}`);
    }
  } else {
    console.error("Please enter your email.");
  }
});

app.post("/login/", async (req, res) => {
  try {
    console.log(`POST request to /login/`);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User found with email, getting password hash");
      const response = await Password.findOne({ user: user._id });
      const auth = await bcrypt.compare(req.body.password, response.password);
      if (auth) {
        const userForToken = {
          email: user.email,
          id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.SECRET, {
          expiresIn: "1m",
        });
        res.status(200).send({ token, email: user.email, name: user.name });
      } else {
        throw new Error("Incorrect Email and password combination");
      }
    } else {
      throw new Error("Account not found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    console.log(`POST request to /api/tasks`);
    // console.log(req.body);
    const response = await Task.create(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.send(`Error: ${error.message}`);
  }
});

app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); //listening to requests on port 5000.
