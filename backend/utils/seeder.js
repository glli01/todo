import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "../data/users.js";
import passwords from "../data/password.js";
import lists from "../data/listsCopy.js";
import tasks from "../data/tasksCopy.js";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import List from "../models/listModel.js";
import Password from "../models/passwordModel.js";
import connectDB from "./db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Task.deleteMany();
    await List.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleLists = lists.map((list) => {
      return { ...list, user: adminUser };
    });
    const createdLists = await List.insertMany(sampleLists);

    const sampleTasks = [];
    const taskList = [...tasks];
    while (taskList.length !== 0) {
      for (let i = 0; i < createdLists.length; i++) {
        const task = taskList.shift();
        sampleTasks.push({
          ...task,
          list: createdLists[i],
          user: createdLists[i].user,
        });
        if (taskList.length == 0) break;
      }
    }
    console.log("sample tasks" + sampleTasks);

    await Task.insertMany(sampleTasks);

    const userPasswords = [];
    for (let i = 0; i < createdUser.length; i++) {
      userPasswords.push({
        user: createdUser[i],
        password: passwords[i].password,
      });
    }
    await Password.insertMany(userPasswords);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
