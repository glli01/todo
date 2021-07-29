import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTask } from "../features/tasks/actions/tasksActions.js";
import { createGuestTask, getGuestTaskId } from "../guest/guestTasks.js";
const AddTask = React.forwardRef(({ list }, ref) => {
  const dispatch = useDispatch();
  const { user, guest } = useSelector((state) => state.user);
  const [taskText, setTaskText] = useState("");

  const handleKeyDown = (e) => {
    const trimmedText = taskText.trim();
    if (e.which === 13 && trimmedText) {
      // Not guest
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
        // Guest
        const id = getGuestTaskId();
        createGuestTask(dispatch, id, list._id, trimmedText);
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
      ref={ref}
    ></input>
  );
});

export default AddTask;
