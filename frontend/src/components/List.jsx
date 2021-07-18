import React from "react";
import { Link } from "react-router-dom";
const List = ({ list }) => {
  return (
    <div>
      <Link to={`/lists/${list._id}`}>
        <div className="sidebar__category__item">
          <span className="wrapper">
            <span
              className={
                list.color
                  ? "sidebar__category__item-label " + list.color
                  : "sidebar__category__item-label"
              }
            ></span>
          </span>
          {list.title}
        </div>
      </Link>
    </div>
  );
};

export default List;
