import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../features/lists/actions/listsActions";

const ListScreen = ({ match }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);
  console.log(lists);
  console.log("updated");
  const list = lists.find((list) => list._id === Number(match.params.id));
  console.log(list);
  // useEffect(() => {
  //   dispatch(getLists());
  // }, [dispatch]);
  // const getList = () => {
  //   const newList = lists.find((list) => list._id === match.params.id);
  //   console.log(lists);
  //   console.log(match.params.id);
  //   console.log(newList);
  //   setList(newList);
  // };

  // useEffect(() => {
  //   getList();
  // }, [match]);

  return <>{list ? <Todo list={list}></Todo> : ""}</>;
};

export default ListScreen;
