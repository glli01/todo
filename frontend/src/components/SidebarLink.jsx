import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { LIST_SET_ACTIVE } from "../features/lists/constants/listsConstants.js";
const SidebarLink = ({ pathName, path, icon, iconActive, title }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={path}
      className={pathName.toLowerCase() !== path.toLowerCase() ? "" : "active"}
      onClick={() => dispatch({ type: LIST_SET_ACTIVE, payload: null })}
    >
      <div className="sidebar__category-title">
        <span className="wrapper--fs">
          <Icon>
            {pathName.toLowerCase() !== path.toLowerCase() ? (
              <img className="hideable__icon--front" src={icon} alt="front" />
            ) : (
              <img
                className="hideable__icon--front"
                src={iconActive}
                alt="front"
              ></img>
            )}
          </Icon>
          {title}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
