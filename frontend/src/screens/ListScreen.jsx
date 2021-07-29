import React from "react";
import { useState, useEffect } from "react";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../features/lists/actions/listsActions";
import AddTask from "../components/AddTask";
import Spinner from "../components/Spinner";

const ListScreen = ({ match }) => {
  const [list, setList] = useState({});
  const dispatch = useDispatch();
  const { loading, lists } = useSelector((state) => state.lists);
  const { guest } = useSelector((state) => state.user);
  useEffect(() => {
    // console.log(lists);
    // console.log("dispatched in listScreen");
    // console.log(lists.find((list) => list._id === match.params.id));
    setList(lists ? lists.find((list) => list._id === match.params.id) : null);
    console.log(list);
    // dispatch(getList(match.params.id));
  }, [dispatch, match, lists]);

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
