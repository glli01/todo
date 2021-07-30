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
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
dotenv.config();

connectDB(); //connects to mongoDB

const app = express(); //call method express and set to app;
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));
// app.use(cors())

const getCookieToken = (req) => {
  return req.cookies.token ? req.cookies.token : null;
};
const getToken = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

app.get("/", (req, res, next) => {
  try {
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (token) {
      res.send(
        `API is running and token is detected...<br>
        Token is: <br>
         Email: ${decodedToken.email}, Id: ${decodedToken.id}, Expired: ${
          Date.now() >= decodedToken.exp * 1000
        }`
      );
    } else res.send("API is running...");
  } catch (error) {
    next(error);
  }
}); //= get request at localhost:3000/

app.get("/api/tasks", async (req, res, next) => {
  try {
    console.log("GET request to /api/tasks");
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const query = await Task.find({ user: decodedToken.id });
    res.json(query);
  } catch (error) {
    next(error);
    console.error(`${error.name} Error: ${error.message}`);
  }
});

app.get("/api/lists", async (req, res, next) => {
  try {
    console.log("GET request to /api/lists");
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const response = await List.find({ user: decodedToken.id });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.put("/api/tasks/:id/complete", async (req, res, next) => {
  try {
    console.log(`PUT request to /api/tasks/${req.params.id}/complete`);
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const response = await Task.findOne({
      user: decodedToken.id,
      _id: req.params.id,
    });
    response.isCompleted = !response.isCompleted;
    const saveResponse = await response.save();
    res.json(saveResponse);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    console.log(`DELETE request to /api/tasks/${req.params.id}`);
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const response = await Task.deleteOne({
      user: decodedToken.id,
      _id: req.params.id,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/api/lists/:id", async (req, res, next) => {
  try {
    console.log(`GET request to /api/lists/${req.params.id}`);
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const response = await List.findOne({
      user: decodedToken.id,
      _id: req.params.id,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/api/tasks/:id", async (req, res, next) => {
  try {
    console.log(`GET request to /api/tasks/${req.params.id}`);
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const response = await Task.findOne({
      user: decodedToken.id,
      _id: req.params.id,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/*", (req, res) => {
  res.sendFile("index.html");
});

// //returns user object with hash value.
// app.get("/login/", async (req, res) => {
//   if (req.query.email) {
//     try {
//       console.log(`GET request to /login/${req.query.email}`);
//       const response = await User.findOne({ email: req.query.email });
//       res.json(response);
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//       res.send(`Error: ${error.message}`);
//     }
//   } else {
//     console.error("Please enter your email.");
//   }
// });

app.post("/login/", async (req, res, next) => {
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
          expiresIn: "24h",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json({ ...user._doc, token });
      } else {
        throw new Error("Incorrect Email and password combination");
      }
    } else {
      throw new Error("Account not found");
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/logout", (req, res, next) => {
  try {
    console.log(`DELETE request to /logout`);
    res.cookie("token", "12345", { httpOnly: true });
    res.status(200).send("Logout success");
  } catch (error) {
    next(error);
  }
});

app.get("/login/verify", async (req, res, next) => {
  console.log(`GET request to /login/verify`);
  try {
    const token = getCookieToken(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decodedToken.id });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.post("/api/tasks", async (req, res, next) => {
  try {
    console.log(`POST request to /api/tasks`);
    // console.log(req.body);
    const response = await Task.create(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`)); //listening to requests on port 5000.
