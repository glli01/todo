import React from "react";
import { useState, useRef } from "react";
import alarmSound from "../assets/sounds/alarm.mp3";
const Timer = () => {
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("00");
  const [timerID, setTimerID] = useState(null);
  const [started, setStarted] = useState(false);
  const audio = useRef();
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
        // alert("Timer done");
        clearInterval(timerIDx);
        audio && audio.current && audio.current.play();
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
    audio && audio.current && audio.current.pause();
    if (audio && audio.current) audio.current.currentTime = 0;
    setStarted(false);
    clearInterval(timerID);
  };
  return (
    <div className="timer">
      <audio ref={audio} src={alarmSound}></audio>
      <div className="timer__clock">
        <div className="wrapper--none">
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
        {!started ? (
          <button
            disabled={started ? true : false}
            className="start"
            onClick={startTimer}
          >
            start
          </button>
        ) : (
          <button
            disabled={started ? false : true}
            className="stop"
            onClick={stopTimer}
          >
            stop
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
