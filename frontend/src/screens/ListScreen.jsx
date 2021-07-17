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

  return <>{list ? <Todo list={list}></Todo> : ""}</>;
};

export default ListScreen;
