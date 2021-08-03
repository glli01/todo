import React, { useEffect } from "react";
import Task from "../components/Task";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const TodayScreen = () => {
  const history = useHistory();
  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    document.title = "Today | Todooos";
  }, [history]);

  return (
    <div>
      <div className="list__title">Today</div>
      {tasks ? (
        tasks
          .filter((task) => {
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
          })
          .map((task) => <Task key={task._id} item={task}></Task>)
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
