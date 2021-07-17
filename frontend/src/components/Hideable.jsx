import React from "react";
import { useState, useEffect } from "react";

const Hideable = ({
  title = "title here",
  activeProp = false,
  children,
  desiredClass = "sidebar__category-title",
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
