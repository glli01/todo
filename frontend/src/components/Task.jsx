import React from "react";
import checkmarkFilled from "../assets/img/checkmark-filled.svg";
import checkmarkUnfilled from "../assets/img/checkmark-unfilled.svg";
import { useState, useEffect } from "react";
const Task = ({ item }) => {
  const [complete, setComplete] = useState(item.isCompleted);

  const toggleComplete = () => {
    let newComplete = !complete;
    setComplete(newComplete);
  };

  // const markAsIncomplete = () => {

  // };
  return (
    <div className={complete ? "task completed" : "task"}>
      {complete ? (
        <img
          src={checkmarkFilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkFilled)}
          onClick={toggleComplete}
        ></img>
      ) : (
        <img
          src={checkmarkUnfilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkFilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onClick={toggleComplete}
        ></img>
      )}{" "}
      <div className="task__title">{item.title}</div>
      {/* {item.description} */}
    </div>
  );
};

export default Task;
