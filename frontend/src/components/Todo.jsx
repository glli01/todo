import React from "react";
import Task from "./Task";
import axios from "axios";
import { useEffect, useState } from "react";

const Todo = ({ list }) => {
  const [tasks, setTasks] = useState([]);
  // let tasks = [];
  //useState("string")
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  return (
    <div className="List">
      <h1>{list.title}</h1>
      {tasks
        .filter((task) => task.list === list._id)
        .map((task) => (
          <Task item={task}></Task>
        ))}
    </div>
  );
};

export default Todo;
