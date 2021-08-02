import React from "react";
import Task from "./Task";
import Hideable from "./Hideable";
import { useSelector } from "react-redux";

const Todo = React.memo(({ list, showCompleted = false }) => {
  // const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([]);
  // let tasks = [];
  //useState("string")
  // useEffect(() => {
  //   dispatch(getAllTasks());
  // }, [dispatch]);

  const { tasks } = useSelector((state) => state.tasks);
  // const getAllTasks = async () => {
  //   const response = await axios.get("/api/tasks");
  //   setTasks(response.data);
  // };

  return (
    <div className="list">
      <div className="list__title">{list ? list.title : ""}</div>
      <div className="list__title-2">Tasks</div>
      <div className="tasks">
        {tasks
          ? tasks
              .filter(
                (task) => task.list === list._id && task.isCompleted === false
              )
              .map((task) => <Task key={task._id} item={task}></Task>)
          : ""}
        <Hideable
          title={"Show completed Tasks"}
          desiredClass="tasks__completed-title"
          activeProp={showCompleted}
        >
          {tasks
            ? tasks
                .filter(
                  (task) => task.list === list._id && task.isCompleted === true
                )
                .map((task) => <Task key={task._id} item={task}></Task>)
            : ""}
        </Hideable>
      </div>
    </div>
  );
});

export default Todo;
