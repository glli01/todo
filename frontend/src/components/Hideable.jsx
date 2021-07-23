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
          {" "}
          {title}
          {assetShow || assetNoShow ? (
            <Icon>
              {active ? (
                <img src={assetShow}></img>
              ) : (
                <img src={assetNoShow}></img>
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
