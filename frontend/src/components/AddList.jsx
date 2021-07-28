import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
const AddList = () => {
  const dispatch = useDispatch();
  const [listText, setListText] = useState("");
  const handleKeyDown = (e) => {
    const trimmedText = listText.trim();
    if (e.which === 13 && trimmedText) {
      dispatch();
      setListText("");
    }
  };
  return (
    <input
      type="string"
      value={taskText}
      onChange={(e) => setListText(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      placeholder="Add a list..."
      className="list__input"
    ></input>
  );
};

export default AddList;
