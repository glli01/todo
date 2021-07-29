import React from "react";
import { useState, useEffect, useRef } from "react";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
// import { getList } from "../features/lists/actions/listsActions";
import AddTask from "../components/AddTask";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { LIST_SET_ACTIVE } from "../features/lists/constants/listsConstants";
import { set } from "mongoose";

const ListScreen = ({ match }) => {
  const listEl = useRef();
  const history = useHistory();
  const [list, setList] = useState({});
  const [listIndex, setListIndex] = useState(0);
  const dispatch = useDispatch();
  const { loading, lists } = useSelector((state) => state.lists);
  const [showCompleted, setShowCompleted] = useState(false);
  // const { guest } = useSelector((state) => state.user);
  useEffect(() => {
    listEl && listEl.current && listEl.current.focus();
    console.log(listEl);
    // console.log(lists);
    // console.log("dispatched in listScreen");
    // console.log(lists.find((list) => list._id === match.params.id));
    const list = lists
      ? lists.find((list) => list._id === match.params.id)
      : null;
    setList(list);
    setListIndex(
      lists ? lists.findIndex((list) => list._id === match.params.id) : 0
    );
    dispatch({ type: LIST_SET_ACTIVE, payload: list });
    // dispatch(getList(match.params.id));
  }, [dispatch, match, lists]);

  const handleKeyDown = (e) => {
    console.log("key press detected");
    console.log(e.key);
    // console.log(listIndex);
    // console.log(lists.length);
    if (e.key === "ArrowRight" && listIndex + 1 < lists.length) {
      // console.log("right arrow key pressed");
      history.push(`/lists/${lists[listIndex + 1]._id}`);
    } else if (e.key === "ArrowLeft" && listIndex - 1 >= 0) {
      history.push(`/lists/${lists[listIndex - 1]._id}`);
    } else if (e.key === " ") {
      // console.log("Spacebar detected");
      setShowCompleted(!showCompleted);
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
                <AddTask list={list}></AddTask>
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
