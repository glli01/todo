import React from "react";
import ConfirmOverlay from "./ConfirmOverlay";
import { useState } from "react";
const HomeScreen = () => {
  const [state, setState] = useState("hello");
  return (
    <>
      <div>
        <div className="home__title"> Today </div>
        <div className="home__text--center">
          The forecast is cloudy with a chance of meatballs.
          <br />
          W.I.P.
          <br />
          {state}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
