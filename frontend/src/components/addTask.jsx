import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTask } from "../features/tasks/actions/tasksActions.js";
import { createGuestTask, getGuestTaskId } from "../guest/guestTasks.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddTask = React.forwardRef(({ list }, ref) => {
  const [showDate, setShowDate] = useState(true);
  const dispatch = useDispatch();
  const { user, guest } = useSelector((state) => state.user);
  const [date, setDate] = useState(new Date());
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
            dueDate: showDate ? date : new Date(0),
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
    <div className="wrapper--w100">
      <input
        type="string"
        value={taskText}
        onChange={(e) => setTaskText(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
        className="task__input"
        ref={ref}
      ></input>
      <div className="wrapper--fs">
        {showDate ? (
          <span
            className="task__button--date"
            onClick={() => setShowDate(false)}
          >
            {" "}
            -{" "}
          </span>
        ) : (
          <span
            className="task__button--date"
            onClick={() => setShowDate(true)}
          >
            {" "}
            +{" "}
          </span>
        )}
        {showDate ? (
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="Pp"
          ></DatePicker>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});

export default AddTask;
