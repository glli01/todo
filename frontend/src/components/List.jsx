import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CONFIRM_OPEN } from "../features/confirm/constants/confirmConstants";
import trash from "../assets/img/trash.svg";
import Hoverable from "./Hoverable";
const List = ({ list }) => {
  const { active } = useSelector((state) => state.lists);
  const guest = useSelector((state) => state.user.guest);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  return (
    <div
      className="list__wrapper"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
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
      <Hoverable show={show}>
        <div
          className="list__delete"
          onClick={() => {
            dispatch({ type: CONFIRM_OPEN, list });
          }}
        >
          <img src={trash} className="task__delete" alt="trash" />
        </div>
      </Hoverable>
    </div>
  );
};

export default List;
