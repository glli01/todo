import React from "react";
import tasks from "../tasks";
import Task from "./Task";

const Todo = () => {
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
