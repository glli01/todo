import React from "react";
import { useEffect } from "react";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../features/lists/actions/listsActions";
import AddTask from "../components/AddTask";

const ListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  useEffect(() => {
    console.log("dispatched in listScreen");
    dispatch(getList(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {list ? (
        <>
          <Todo list={list}></Todo>
          <AddTask list={list}></AddTask>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ListScreen;
