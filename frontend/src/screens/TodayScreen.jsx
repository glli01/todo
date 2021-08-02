import React, { useState, useEffect } from "react";
import Task from "../components/Task";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const TodayScreen = () => {
  const history = useHistory();
  const [dueToday, setDueToday] = useState([]);
  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    document.title = "Today | Todooos";
  }, [history]);
  useEffect(() => {
    const newDueToday = tasks.filter((task) => {
      const today = new Date();
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        )
          return true;
      }
      return false;
    });
    console.log(newDueToday);
    setDueToday(newDueToday);
  }, [tasks]);
  return (
    <div>
      <div className="list__title">Today</div>
      {dueToday && dueToday.length > 0 ? (
        dueToday.map((task) => <Task key={task._id} item={task}></Task>)
      ) : (
        // ?
        <div className="list__title-2 text--center">
          {" "}
          You do not have any tasks due today!
        </div>
      )}
    </div>
  );
};

export default TodayScreen;
