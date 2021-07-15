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
    <div className="list">
      <div className="list__title">{list.title}</div>
      <div className="list__title-2">Tasks</div>
      {tasks
        .filter((task) => task.list === list._id)
        .map((task) => (
          <Task item={task}></Task>
        ))}
    </div>
  );
};

export default Todo;
