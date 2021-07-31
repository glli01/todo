import React from "react";
import axios from "axios";
import List from "./List";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hideable from "./Hideable";
import Timer from "./Timer";
import arrowDown from "../assets/img/arrow-down.svg";
import arrowLeft from "../assets/img/arrow-left.svg";
import SidebarUser from "./SidebarUser";
import AddList from "./AddList";
import bird from "../assets/img/bird.svg";
import Icon from "./Icon";
import { useHistory } from "react-router";
import { useState } from "react";
import today from "../assets/img/today.svg";
import tomorrow from "../assets/img/tomorrow.svg";
import list from "../assets/img/list.svg";
import timer from "../assets/img/timer.svg";
import todayPurple from "../assets/img/today--purple.svg";
import tomorrowPurple from "../assets/img/tomorrow--purple.svg";
import listPurple from "../assets/img/list--purple.svg";
import timerPurple from "../assets/img/timer--purple.svg";
import ConfirmOverlay from "../screens/ConfirmOverlay";

const ListSidebar = () => {
  const history = useHistory();
  const { lists } = useSelector((state) => state.lists);
  return (
    <>
      <div className="sidebar">
        <div>
          <div
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          >
            <img className="logo__icon" src={bird}></img>
            todooos
          </div>
          <Hideable
            frontIconShow={todayPurple}
            frontIconNoShow={today}
            activeProp={false}
            title={"Today"}
          ></Hideable>
          <Hideable
            frontIconShow={tomorrowPurple}
            frontIconNoShow={tomorrow}
            activeProp={false}
            title={"Tomorrow"}
          ></Hideable>
          <Hideable
            frontIconNoShow={timer}
            frontIconShow={timerPurple}
            activeProp={false}
            title={"Timer"}
            assetShow={arrowDown}
            assetNoShow={arrowLeft}
          >
            <Timer></Timer>
          </Hideable>
          <Hideable
            frontIconNoShow={list}
            frontIconShow={listPurple}
            activeProp={true}
            title={"Lists"}
            assetShow={arrowDown}
            assetNoShow={arrowLeft}
          >
            <div className="sidebar__category">
              {lists
                ? lists.map((list) => (
                    <List key={list._id} list={list}>
                      {" "}
                    </List>
                  ))
                : ""}
              <AddList></AddList>
            </div>
          </Hideable>
        </div>
        <SidebarUser></SidebarUser>
      </div>
    </>
  );
};

export default ListSidebar;
