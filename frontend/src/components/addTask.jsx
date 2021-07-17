import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
const AddTask = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("add a task here");
  const handleKeyDown = (e) => {
    const trimmedText = taskText.trim();
    if (e.which === 13 && trimmedText) {
    }
  };
  return (
    <input
      type="string"
      value={taskText}
      onChange={(e) => setTaskText(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      className="task__input"
    ></input>
  );
};

export default AddTask;
