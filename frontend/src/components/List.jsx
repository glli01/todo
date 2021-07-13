import React from "react";
import { Link } from "react-router-dom";

const List = ({ list }) => {
  return (
    <div>
      <div className="sidebar__title">
        <Link to={`/lists/${list._id}`}>{list.title}</Link>
      </div>
    </div>
  );
};

export default List;
