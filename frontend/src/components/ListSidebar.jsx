import React from "react";
import axios from "axios";
import List from "./List";
import { useEffect, useState } from "react";
import Hideable from "./Hideable";
import Timer from "./Timer";
import arrowDown from "../assets/img/arrow-down.svg";
import arrowLeft from "../assets/img/arrow-left.svg";
import SidebarUser from "./SidebarUser";
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
      <div>
        <div className="logo">TodoList</div>
        <Hideable activeProp={false} title={"Today"}>
          <div className="sidebar__category">
            {lists
              .filter((list) => list._id % 2 === 1)
              .map((list) => (
                <List key={list._id} list={list}>
                  {" "}
                </List>
              ))}
          </div>
        </Hideable>
        <Hideable activeProp={false} title={"Tomorrow"}></Hideable>
        <Hideable
          activeProp={false}
          title={"Timer"}
          assetShow={arrowDown}
          assetNoShow={arrowLeft}
        >
          <Timer></Timer>
        </Hideable>
        <Hideable
          activeProp={true}
          title={"Lists"}
          assetShow={arrowDown}
          assetNoShow={arrowLeft}
        >
          <div className="sidebar__category">
            {lists.map((list) => (
              <List key={list._id} list={list}>
                {" "}
              </List>
            ))}
          </div>
        </Hideable>
      </div>
      <SidebarUser></SidebarUser>
    </div>
  );
};

export default ListSidebar;
