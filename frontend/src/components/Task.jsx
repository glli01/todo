import React from "react";
import checkmarkFilled from "../assets/img/checkmark-filled.svg";
import checkmarkUnfilled from "../assets/img/checkmark-unfilled.svg";
const Task = ({ item }) => {
  const markAsComplete = () => {};

  const markAsIncomplete = () => {};
  return (
    <div className={item.isCompleted ? "task completed" : "task"}>
      {item.isCompleted ? (
        <img
          src={checkmarkFilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkFilled)}
          onClick={markAsComplete}
        ></img>
      ) : (
        <img
          src={checkmarkUnfilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkFilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onClick={markAsIncomplete}
        ></img>
      )}{" "}
      <div className="task__title">{item.title}</div>
      {/* {item.description} */}
    </div>
  );
};

export default Task;
