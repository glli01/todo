import React from "react";
import List from "./List";
import { useSelector, useDispatch } from "react-redux";
import Hideable from "./Hideable";
import Timer from "./Timer";
import arrowDown from "../assets/img/arrow-down.svg";
import arrowLeft from "../assets/img/arrow-left.svg";
import SidebarUser from "./SidebarUser";
import AddList from "./AddList";
import bird from "../assets/img/bird.svg";
import { useHistory } from "react-router";
import today from "../assets/img/today.svg";
import tomorrow from "../assets/img/tomorrow.svg";
import list from "../assets/img/list.svg";
import timer from "../assets/img/timer.svg";
import todayPurple from "../assets/img/today--purple.svg";
import tomorrowPurple from "../assets/img/tomorrow--purple.svg";
import { LIST_SET_ACTIVE } from "../features/lists/constants/listsConstants";
import listPurple from "../assets/img/list--purple.svg";
import timerPurple from "../assets/img/timer--purple.svg";

const ListSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { lists } = useSelector((state) => state.lists);
  const active = useSelector((state) => state.lists.active);
  return (
    <>
      <div className="sidebar">
        <div>
          <div
            className="logo"
            onClick={() => {
              dispatch({ type: LIST_SET_ACTIVE, payload: null });
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
