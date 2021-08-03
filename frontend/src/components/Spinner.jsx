import React from "react";
import spinner from "../assets/img/spinner.svg";
import bird from "../assets/img/spinner-bird.svg";
const Spinner = () => {
  return (
    <div className="spinner">
      <div className="wrapper">
        <img src={bird} alt="" className="spinner-bird" />
        <img className="spinner-icn" src={spinner} alt="spinner" />
      </div>
    </div>
  );
};

export default Spinner;
