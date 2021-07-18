import React from "react";
import checkmarkFilled from "../assets/img/checkmark-filled.svg";
import checkmarkUnfilled from "../assets/img/checkmark-unfilled.svg";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  TASK_TOGGLE_COMPLETED,
  TASK_DELETE,
} from "../features/tasks/constants/tasksConstants";
import { useState } from "react";
import Hoverable from "./Hoverable";
// import { toggleCompleted } from "../features/tasks/actions/tasksActions";
const Task = ({ item }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { isCompleted } = useSelector(
    (state) => state.tasks.tasks.find((task) => task === item),
    shallowEqual
  );
  // const [complete, setComplete] = useState(item.isCompleted);

  // const markAsIncomplete = () => {

  // };
  const fillMark = (e) => {
    e.currentTarget.parentElement.parentElement.className = "task completed";
    e.currentTarget.src = checkmarkFilled;
  };

  const unfillMark = (e) => {
    e.currentTarget.parentElement.parentElement.className = "task";
    e.currentTarget.src = checkmarkUnfilled;
  };
  const clickToggle = () => {
    dispatch({ type: TASK_TOGGLE_COMPLETED, id: item._id });
  };
  const clickDelete = () => {
    dispatch({ type: TASK_DELETE, id: item._id });
  };
  return (
    <div
      className={isCompleted ? "task completed" : "task"}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <div className="task__wrapper">
        {isCompleted ? (
          <img
            src={checkmarkFilled}
            onMouseOver={unfillMark}
            onMouseOut={fillMark}
            onClick={clickToggle}
            alt="filled checkmark"
          ></img>
        ) : (
          <img
            src={checkmarkUnfilled}
            onMouseOver={fillMark}
            onMouseOut={unfillMark}
            onClick={clickToggle}
            alt="unfilled checkmark"
          ></img>
        )}{" "}
        <div className="task__title">{item.title}</div>
      </div>
      <Hoverable show={show}>
        <span className="delete" onClick={clickDelete}>
          delete
        </span>
      </Hoverable>
      {/* {item.description} */}
    </div>
  );
};

export default Task;
