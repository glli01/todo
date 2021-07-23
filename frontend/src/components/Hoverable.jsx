import React from "react";

const Hoverable = ({ children, show }) => {
  return (
    <span className={show ? "hoverable-content active" : "hoverable-content"}>
      {children}
    </span>
  );
};

export default Hoverable;
