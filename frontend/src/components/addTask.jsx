import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TASK_ADD } from "../features/tasks/constants/tasksConstants";
const AddTask = ({ list }) => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const handleKeyDown = (e) => {
    const trimmedText = taskText.trim();
    if (e.which === 13 && trimmedText) {
      console.log("got enter key");
      dispatch({
        type: TASK_ADD,
        payload: {
          title: trimmedText,
          description: "",
          isCompleted: false,
          list: list._id,
        },
      });
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
