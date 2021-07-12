import React from "react";

const Task = ({ item }) => {
  return (
    <div className="task">
      <h3>{item.title}</h3>
      <div>{item.description}</div>
      <div>{item.isCompleted ? "true" : "false"}</div>
    </div>
  );
};

export default Task;
