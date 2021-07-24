import React from "react";
import { useEffect } from "react";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../features/lists/actions/listsActions";
import AddTask from "../components/AddTask";
import Spinner from "../components/Spinner";

const ListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, list } = useSelector((state) => state.list);
  useEffect(() => {
    console.log("dispatched in listScreen");
    dispatch(getList(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {list ? (
        <>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <Todo list={list}></Todo>
              <AddTask list={list}></AddTask>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ListScreen;
