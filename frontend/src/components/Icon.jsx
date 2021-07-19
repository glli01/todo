import React from "react";

const Icon = ({ children }) => {
  return (
    <span className="icon">
      <div className="wrapper">{children}</div>
    </span>
  );
};

export default Icon;
