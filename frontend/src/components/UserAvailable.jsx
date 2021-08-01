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
        onMouseOver={() => {
          setHovering(true);
        }}
        onMouseOut={(e) => {
          console.log(e.target.parentNode);
          console.log(e);
          if (e.target.className !== "wrapper--w100") setHovering(false);
        }}
      >
        {hovering ? (
          <div className="wrapper--w100">
            <div className="wrapper--horizontal">
              <Link
                className="button user__sign-out"
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
            <div className="wrapper--fs">
              <div className="user__wrapper--profile-pic">
                <Icon>
                  <img className="user__profile-pic" src={profilePic}></img>
                </Icon>
              </div>
              <div className="wrapper user--available__text">
                {user.firstName || user.name}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserAvailable;
