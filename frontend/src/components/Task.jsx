import React from "react";

const Task = ({ item }) => {
  return (
    <div className={item.isCompleted ? "task completed" : "task"}>
      {item.isCompleted ? <span> </span> : <span> </span>} {item.title}
      {/* {item.description} */}
    </div>
  );
};

export default Task;
