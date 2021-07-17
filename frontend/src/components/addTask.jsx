import React from "react";
import { useState, useEffect } from "react";
const addTask = () => {
  const [taskText, setTaskText] = useState("");
  return (
    <input
      type="string"
      value={taskText}
      onChange={(e) => setTaskText(e.currentTarget.value)}
      className="task__input"
    ></input>
  );
};

export default addTask;
