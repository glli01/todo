import React from "react";
import checkmarkFilled from "../assets/img/checkmark-filled.svg";
import checkmarkUnfilled from "../assets/img/checkmark-unfilled.svg";
const Task = ({ item }) => {
  return (
    <div className={item.isCompleted ? "task completed" : "task"}>
      {item.isCompleted ? (
        <img src={checkmarkFilled}></img>
      ) : (
        <img src={checkmarkUnfilled}></img>
      )}{" "}
      {item.title}
      {/* {item.description} */}
    </div>
  );
};

export default Task;
