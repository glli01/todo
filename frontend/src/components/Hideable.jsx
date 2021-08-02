import React from "react";
import { useState, useEffect } from "react";
import Icon from "./Icon";

const Hideable = ({
  title = "title here",
  activeProp = false,
  children,
  desiredClass = "sidebar__category-title",
  assetShow,
  assetNoShow,
  frontIconShow,
  frontIconNoShow,
}) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(activeProp);
  }, [activeProp]);

  const toggleActive = () => {
    let newActive = !active;
    setActive(newActive);
  };

  return (
    <>
      <div className={active ? "hideable active" : "hideable"}>
        <div className={desiredClass} onClick={toggleActive}>
          <span className="wrapper--fs">
            {frontIconShow || frontIconNoShow ? (
              <Icon>
                {active ? (
                  <img
                    className="hideable__icon--front"
                    src={frontIconShow}
                    alt=""
                  />
                ) : (
                  <img
                    className="hideable__icon--front"
                    src={frontIconNoShow}
                    alt=""
                  ></img>
                )}
              </Icon>
            ) : (
              ""
            )}{" "}
            {title}
          </span>
          {assetShow || assetNoShow ? (
            <Icon>
              {active ? (
                <img src={assetShow} alt=""></img>
              ) : (
                <img src={assetNoShow} alt=""></img>
              )}
            </Icon>
          ) : (
            ""
          )}
        </div>
        <div
          className={active ? "hideable-content active" : "hideable-content"}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Hideable;
