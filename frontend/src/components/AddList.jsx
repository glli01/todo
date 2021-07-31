import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../features/lists/actions/listsActions.js";
import { getGuestListID } from "../guest/guestLists.js";
// import { ChromePicker } from "react-color";
import { HexColorPicker } from "react-colorful";
const AddList = () => {
  const dispatch = useDispatch();
  const wrapper = useRef();
  const { user, guest } = useSelector((state) => state.user);
  const [listText, setListText] = useState("");
  const [color, setColor] = useState("#ffac2d");
  const [show, setShow] = useState(false);

  const handleKeyDown = (e) => {
    const trimmedText = listText.trim();
    if (e.which === 13 && trimmedText) {
      if (!guest) {
        dispatch(
          addList(
            {
              title: trimmedText,
              description: "no description",
              color: color,
              user: user._id,
            },
            guest
          )
        );
        setListText("");
      } else {
        const id = getGuestListID();
        dispatch(
          addList(
            {
              _id: id.toString(),
              title: trimmedText,
              description: "no description",
              color: color,
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
    <>
      <div className="sidebar__category__item">
        <span className="wrapper--hi" onClick={() => setShow(!show)}>
          <span
            className={
              color
                ? "sidebar__category__item-label "
                : "sidebar__category__item-label"
            }
            style={{ "background-color": color }}
          ></span>
        </span>
        <input
          type="string"
          value={listText}
          onChange={(e) => setListText(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a list..."
          className="list__input"
        ></input>
        <div className={show ? "color-picker active" : "color-picker"}>
          <div className="color-picker__wrapper" ref={wrapper}>
            <HexColorPicker color={color} onChange={setColor}></HexColorPicker>
          </div>
        </div>
      </div>
      <div
        className={show ? "screen-cover active" : "screen-cover"}
        onClick={(e) => {
          // console.log(e.target);
          if (e.target.className !== "react-colorful__interactive")
            setShow(false);
        }}
      ></div>
    </>
  );
};

export default AddList;
