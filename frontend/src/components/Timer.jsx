import React from "react";
import { useState } from "react";
const Timer = () => {
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("00");
  const [timerID, setTimerID] = useState(null);
  const [started, setStarted] = useState(false);
  const minuteChange = (e) => {
    e.target.value =
      e.target.value[0] === "0" ? e.target.value.substr(1) : e.target.value;
    e.target.value =
      e.target.value.length === 0
        ? "00"
        : e.target.value.length === 1
        ? "0" + e.target.value
        : e.target.value;
    setMinutes(e.target.value > 59 ? 59 : e.target.value);
  };

  const secondChange = (e) => {
    e.target.value =
      e.target.value[0] === "0" ? e.target.value.substr(1) : e.target.value;
    e.target.value =
      e.target.value.length === 0
        ? "00"
        : e.target.value.length === 1
        ? "0" + e.target.value
        : e.target.value;
    setSeconds(e.target.value > 59 ? 59 : e.target.value);
  };

  const startTimer = () => {
    let minutez = minutes;
    let secondz = seconds;
    setStarted(true);
    let timerIDx = setInterval(() => {
      if (secondz === "00" && minutez === "00") {
        console.log("done");
        clearInterval(timerIDx);
        setMinutes("00");
        setSeconds("00");
        return;
      } else if (secondz <= 0) {
        minutez--;
        minutez = minutez <= 9 ? "0" + minutez : minutez;
        secondz = "59";
      } else {
        secondz--;
        secondz = secondz <= 9 ? "0" + secondz : secondz;
      }

      setMinutes(minutez);
      setSeconds(secondz);
      console.log("set minutes");
    }, 1000);
    setTimerID(timerIDx);
  };

  const stopTimer = () => {
    setStarted(false);
    clearInterval(timerID);
  };
  return (
    <div className="timer">
      <div className="timer__clock">
        <div className="wrapper">
          <input
            className="timer__clock__input"
            type="number"
            value={minutes}
            onChange={minuteChange}
          ></input>
          :
          <input
            className="timer__clock__input"
            type="number"
            value={seconds}
            onChange={secondChange}
          ></input>
        </div>
      </div>
      <div className="flex">
        <button
          disabled={started ? true : false}
          className="start"
          onClick={startTimer}
        >
          start
        </button>
        <button
          disabled={started ? false : true}
          className="stop"
          onClick={stopTimer}
        >
          stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
