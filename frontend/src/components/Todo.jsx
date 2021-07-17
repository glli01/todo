import React from "react";
import Task from "./Task";
import { useEffect } from "react";
import Hideable from "./Hideable";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../features/tasks/actions/tasksActions.js";

const Todo = ({ list }) => {
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([]);
  // let tasks = [];
  //useState("string")
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks);
  // const getAllTasks = async () => {
  //   const response = await axios.get("/api/tasks");
  //   setTasks(response.data);
  // };

  return (
    <div className="list">
      <div className="list__title">{list ? list.title : ""}</div>
      <div className="list__title-2">Tasks</div>
      {tasks
        ? tasks
            .filter(
              (task) => task.list === list._id && task.isCompleted === false
            )
            .map((task) => <Task item={task}></Task>)
        : ""}
      <Hideable
        title={"Show completed Tasks"}
        desiredClass="tasks__completed-title"
      >
        {tasks
          ? tasks
              .filter(
                (task) => task.list === list._id && task.isCompleted === true
              )
              .map((task) => <Task item={task}></Task>)
          : ""}
      </Hideable>
    </div>
  );
};

export default Todo;
