import React from "react";

const Icon = ({ children }) => {
  return (
    <span className="icon">
      <span className="wrapper">{children}</span>
    </span>
  );
};

export default Icon;
