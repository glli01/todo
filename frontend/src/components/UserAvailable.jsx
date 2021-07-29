import React from "react";
import Icon from "./Icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/actions/userActions.js";
const UserAvailable = ({ user, profilePic }) => {
  const dispatch = useDispatch();
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <div
        className="user--available"
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
      >
        {hovering ? (
          <div className="wrapper--w100">
            <div className="wrapper--horizontal">
              <Link
                className="button"
                to={"/logout"}
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Sign out{" "}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Icon>
              <img className="user__profile-pic" src={profilePic}></img>
            </Icon>
            <div className="wrapper">{user.name}</div>
          </>
        )}
      </div>
    </>
  );
};

export default UserAvailable;
