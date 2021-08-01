import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import guest from "../assets/img/user.svg";
import UserAvailable from "./UserAvailable";
const SidebarUser = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user && (user.name || user.firstName) ? (
        <UserAvailable user={user} profilePic={guest}></UserAvailable>
      ) : (
        <div className="user--unavailable">
          <div className="wrapper">
            <div className="wrapper--horizontal">
              <Link to={"/login"} className="button">
                Sign in{" "}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarUser;
