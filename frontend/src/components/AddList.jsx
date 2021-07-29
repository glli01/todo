import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../features/lists/actions/listsActions.js";
const AddList = () => {
  const dispatch = useDispatch();
  const { user, guest } = useSelector((state) => state.user);
  const [listText, setListText] = useState("");
  const handleKeyDown = (e) => {
    const trimmedText = listText.trim();
    if (e.which === 13 && trimmedText) {
      if (!guest) {
      } else {
        const state = JSON.parse(window.localStorage.getItem("state"));
        const lists = state ? state.lists : null;
        const id = lists
          ? Math.max(...lists.map((list) => Number(list._id))) + 1
          : 0;
        dispatch(
          addList(
            {
              _id: id.toString(),
              title: trimmedText,
              description: "no description",
              color: "blue",
              user: "guest",
            },
            true
          )
        );
        setListText("");
      }
    }
  };
  return (
    <input
      type="string"
      value={listText}
      onChange={(e) => setListText(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      placeholder="Add a list..."
      className="list__input"
    ></input>
  );
};

export default AddList;
