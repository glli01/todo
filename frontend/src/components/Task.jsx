import React from "react";
import checkmarkFilled from "../assets/img/checkmark-filled.svg";
import checkmarkUnfilled from "../assets/img/checkmark-unfilled.svg";
// import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TASK_TOGGLE_COMPLETED } from "../features/tasks/constants/tasksConstants";
// import { toggleCompleted } from "../features/tasks/actions/tasksActions";
const Task = ({ item }) => {
  const dispatch = useDispatch();
  const { isCompleted } = useSelector(
    (state) => state.tasks.tasks.find((task) => task === item),
    shallowEqual
  );
  // const [complete, setComplete] = useState(item.isCompleted);

  // const markAsIncomplete = () => {

  // };
  const clickToggle = () => {
    dispatch({ type: TASK_TOGGLE_COMPLETED, id: item._id });
  };
  return (
    <div className={isCompleted ? "task completed" : "task"}>
      {isCompleted ? (
        <img
          src={checkmarkFilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkFilled)}
          onClick={clickToggle}
          alt="filled checkmark"
        ></img>
      ) : (
        <img
          src={checkmarkUnfilled}
          onMouseOver={(e) => (e.currentTarget.src = checkmarkFilled)}
          onMouseOut={(e) => (e.currentTarget.src = checkmarkUnfilled)}
          onClick={clickToggle}
          alt="unfilled checkmark"
        ></img>
      )}{" "}
      <div className="task__title">{item.title}</div>
      {/* {item.description} */}
    </div>
  );
};

export default Task;
