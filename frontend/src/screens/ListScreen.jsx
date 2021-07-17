import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { getLists, getList } from "../features/lists/actions/listsActions";

const ListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  useEffect(() => {
    dispatch(getList(match.params.id));
  }, [dispatch]);

  return <>{list ? <Todo list={list}></Todo> : ""}</>;
};

export default ListScreen;
