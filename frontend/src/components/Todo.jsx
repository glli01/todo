import React from "react";
import Task from "./Task";
import axios from "axios";
import { useEffect, useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  return (
    <div className="List">
      <h1>MY TODOLIST</h1>
      {tasks.map((task) => (
        <Task item={task}></Task>
      ))}
    </div>
  );
};

export default Todo;
