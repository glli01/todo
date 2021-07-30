import React from "react";
import { useState, useEffect, useRef } from "react";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
// import { getList } from "../features/lists/actions/listsActions";
import AddTask from "../components/AddTask";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { LIST_SET_ACTIVE } from "../features/lists/constants/listsConstants";
import { TASK_DELETE } from "../features/tasks/constants/tasksConstants";
import { toggleTaskCompleted } from "../features/tasks/actions/tasksActions";

const ListScreen = ({ match }) => {
  const listEl = useRef();
  const inputEl = useRef();
  const history = useHistory();
  const [list, setList] = useState({});
  const [listIndex, setListIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, lists } = useSelector((state) => state.lists);
  const { tasks } = useSelector((state) => state.tasks);
  const [showCompleted, setShowCompleted] = useState(false);
  const guest = useSelector((state) => state.user.guest);

  useEffect(() => {
    listEl && listEl.current && listEl.current.focus();
    // console.log(listEl);
    const list = lists
      ? lists.find((list) => list._id === match.params.id)
      : null;
    setList(list);
    if (list) document.title = `Todooos | ${list.title}`;
    setListIndex(
      lists ? lists.findIndex((list) => list._id === match.params.id) : 0
    );
    dispatch({ type: LIST_SET_ACTIVE, payload: list });
  }, [dispatch, match, lists]);

  const handleKeyDown = (e) => {
    console.log(document.activeElement);
    console.log("key press detected");
    console.log(e.key);
    if (e.key === "ArrowRight" && listIndex + 1 < lists.length) {
      history.push(`/lists/${lists[listIndex + 1]._id}`);
    } else if (e.key === "ArrowLeft" && listIndex - 1 >= 0) {
      history.push(`/lists/${lists[listIndex - 1]._id}`);
    } else if (e.key === " " && document.activeElement !== inputEl.current) {
      setShowCompleted(!showCompleted);
    } else if (e.key === "d" && document.activeElement !== inputEl.current) {
      const filteredTasks = tasks.filter(
        (task) => task.list === list._id && task.isCompleted === false
      );
      const taskToDelete = filteredTasks ? filteredTasks[0] : null;
      if (taskToDelete) {
        dispatch({ type: TASK_DELETE, id: taskToDelete._id });
      }
    } else if (e.key === "c" && document.activeElement !== inputEl.current) {
      const filteredTasks = tasks.filter(
        (task) => task.list === list._id && task.isCompleted === false
      );
      const taskToComplete = filteredTasks ? filteredTasks[0] : null;
      if (taskToComplete) {
        dispatch(toggleTaskCompleted(taskToComplete._id, guest));
      }
    } else if (
      e.key === "Enter" &&
      document.activeElement !== inputEl.current
    ) {
      inputEl.current.focus();
    } else if (e.key === "Escape" || e.key === "F12") {
      // console.log("in Escape sequence");
      document.activeElement.blur();
      listEl.current.focus();
    }
  };
  return (
    <>
      <div
        className="list__screen"
        ref={listEl}
        tabIndex="-1"
        onKeyDown={handleKeyDown}
      >
        {list ? (
          <>
            {loading ? (
              <Spinner></Spinner>
            ) : (
              <>
                <Todo list={list} showCompleted={showCompleted}></Todo>
                <AddTask ref={inputEl} list={list}></AddTask>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ListScreen;
