import React from "react";
import axios from "axios";
import List from "./List";
import { useEffect, useState } from "react";
import Hideable from "./Hideable";
import Timer from "./Timer";
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
      <div className="logo">todoList</div>
      <Hideable activeProp={false} title={"Today"}>
        <div className="sidebar__category">
          {lists
            .filter((list) => list._id % 2 === 1)
            .map((list) => (
              <List list={list}> </List>
            ))}
        </div>
      </Hideable>
      <Hideable activeProp={false} title={"Tomorrow"}></Hideable>
      <Hideable activeProp={false} title={"Timer"}>
        <Timer></Timer>
      </Hideable>
      <Hideable activeProp={true} title={"Lists"}>
        <div className="sidebar__category">
          {lists.map((list) => (
            <List list={list}> </List>
          ))}
        </div>
      </Hideable>
    </div>
  );
};

export default ListSidebar;
