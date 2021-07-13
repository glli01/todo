import React from "react";
import axios from "axios";
import List from "./List";
import { useEffect, useState } from "react";

const ListSidebar = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getAllLists();
  }, []);

  const getAllLists = async () => {
    const { data } = await axios.get("/api/lists");
    setLists(data);
  };

  return (
    <div className="sidebar">
      {lists.map((list) => (
        <List list={list}> </List>
      ))}
    </div>
  );
};

export default ListSidebar;
