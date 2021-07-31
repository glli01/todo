import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONFIRM_CLOSE } from "../features/confirm/constants/confirmConstants";
import { deleteList } from "../features/lists/actions/listsActions";
const ConfirmOverlay = (
  {
    // prompt = "Are you sure you want to delete this list?",
    // promptYes = "Delete",
    // promptNo = "Cancel",
    // open = false,
    // setOpen,
    // confirmHandler,
  }
) => {
  const dispatch = useDispatch();

  const divEl = useRef();
  const { open, type, list } = useSelector((state) => state.confirm);
  const guest = useSelector((state) => state.user.guest);
  useEffect(() => {
    divEl && divEl.current && divEl.current.focus();
  }, [open]);

  const handleKeyDown = (e) => {
    console.log("key press found");
    if (e.which === 13) {
      dispatch(deleteList(list, guest));
      dispatch({ type: CONFIRM_CLOSE });
    }
  };
  return (
    <div
      ref={divEl}
      className={open ? "showable active" : "showable"}
      tabIndex="-1"
      onKeyDown={handleKeyDown}
    >
      <div
        className="confirm__wrapper"
        onClick={() => {
          dispatch({ type: CONFIRM_CLOSE });
        }}
      >
        <div className="confirm__form">
          <div className="confirm__form__prompt">Delete this list?</div>
          <div className="wrapper--between">
            <div
              className="confirm__button--yes"
              onClick={() => {
                if (type === "list") {
                  dispatch(deleteList(list, guest));
                }
                dispatch({ type: CONFIRM_CLOSE });
              }}
            >
              Delete
            </div>
            <div
              className="confirm__button--no"
              onClick={() => {
                dispatch({ type: CONFIRM_CLOSE });
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOverlay;
