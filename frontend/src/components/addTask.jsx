import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTask } from "../features/tasks/actions/tasksActions.js";
const AddTask = ({ list }) => {
  const dispatch = useDispatch();
  const { user, guest } = useSelector((state) => state.user);
  const [taskText, setTaskText] = useState("");
  const handleKeyDown = (e) => {
    const trimmedText = taskText.trim();
    if (e.which === 13 && trimmedText) {
      if (!guest) {
        dispatch(
          createNewTask({
            title: trimmedText,
            description: "no description",
            list: list._id,
            user: user._id,
          })
        );
      } else {
        const tasks = window.localStorage.getItem("tasks");
        const id = Math.max(tasks.map((task) => task._id)) + 1;
        dispatch(
          createNewTask(
            {
              _id: id,
              title: trimmedText,
              description: "no description",
              list: list._id,
              user: "guest",
            },
            guest
          )
        );
      }
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
