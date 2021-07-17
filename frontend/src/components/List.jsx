import React from "react";
import { Link } from "react-router-dom";
const List = ({ list }) => {
  return (
    <div>
      <Link to={`/lists/${list._id}`}>
        <div className="sidebar__category__item">{list.title}</div>
      </Link>
    </div>
  );
};

export default List;
