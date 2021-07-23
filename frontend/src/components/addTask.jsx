import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TASK_ADD } from "../features/tasks/constants/tasksConstants";
import { createNewTask } from "../features/tasks/actions/tasksActions.js";
const AddTask = ({ list }) => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const handleKeyDown = (e) => {
    const trimmedText = taskText.trim();
    if (e.which === 13 && trimmedText) {
      console.log("got enter key");
      dispatch(
        createNewTask({
          title: trimmedText,
          description: "no description",
          list: list._id,
          user: "60f5f4497dd7b2277481702e",
        })
      );
      setTaskText("");
    }
  };
  return (
    <input
      type="string"
      value={taskText}
      onChange={(e) => setTaskText(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      placeholder="Add a task..."
      className="task__input"
    ></input>
  );
};

export default AddTask;
