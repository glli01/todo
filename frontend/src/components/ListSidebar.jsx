import React, { useEffect, useState } from "react";
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
import SidebarLink from "./SidebarLink";
// import { Link } from "react-router-dom";
// import Icon from "./Icon";

const ListSidebar = () => {
  const [pathName, setPathName] = useState("/");
  const dispatch = useDispatch();
  const history = useHistory();
  const { lists } = useSelector((state) => state.lists);
  // const active = useSelector((state) => state.lists.active);
  useEffect(() => {
    setPathName(history.location.pathname);
  }, [history.location.pathname]);
  useEffect(() => {
    return history.listen((location) => {
      console.log(`Changed to: ${location.pathname}`);
      setPathName(location.pathname);
    });
  }, [history]);
  return (
    <>
      <div className="sidebar">
        <div>
          <div
            className="logo"
            onClick={() => {
              dispatch({ type: LIST_SET_ACTIVE, payload: null });
              setPathName("/");
              history.push("/");
            }}
          >
            <img className="logo__icon" src={bird} alt=""></img>
            todooos
          </div>
          <SidebarLink
            path={"/today"}
            pathName={pathName}
            icon={today}
            iconActive={todayPurple}
            title={"Today"}
          ></SidebarLink>
          {/* <Link to="/today" className={pathName !== "/today" ? "" : "active"}>
            <div className="sidebar__category-title">
              <span className="wrapper--fs">
                <Icon>
                  {pathName !== "/today" ? (
                    <img
                      className="hideable__icon--front"
                      src={today}
                      alt="front"
                    />
                  ) : (
                    <img
                      className="hideable__icon--front"
                      src={todayPurple}
                      alt="front"
                    ></img>
                  )}
                </Icon>
                Today
              </span>
            </div>
          </Link> */}
          <SidebarLink
            path={"/tomorrow"}
            pathName={pathName}
            icon={tomorrow}
            iconActive={tomorrowPurple}
            title={"Tommorow"}
          ></SidebarLink>
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
