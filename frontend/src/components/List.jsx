import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const List = ({ list }) => {
  const { active } = useSelector((state) => state.lists);
  return (
    <div>
      <Link to={`/lists/${list._id}`}>
        <div
          className={
            active && list && active._id === list._id
              ? "sidebar__category__item--active"
              : "sidebar__category__item"
          }
        >
          <span className="wrapper--hi">
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
