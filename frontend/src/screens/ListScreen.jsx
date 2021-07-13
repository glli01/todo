import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "../components/Todo";

const ListScreen = ({ match }) => {
  // const [tasks, setTasks] = useState([]);
  const [list, setList] = useState({});

  const getList = async (id) => {
    const { data } = await axios.get(`/api/lists/${id}`);
    setList(data);
  };

  useEffect(() => {
    getList(match.params.id);
  }, [match]);

  return <Todo list={list}></Todo>;
};

export default ListScreen;
