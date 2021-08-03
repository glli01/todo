import React from "react";
import arrowRight from "../assets/img/arrow-right-dark.svg";
import arrowLeft from "../assets/img/arrow-left-dark.svg";
import { useHistory } from "react-router";
import { useRef, useEffect } from "react";
const OnBoarding = ({ title, img, pageNum, setPage, pageMax, setShow }) => {
  const history = useHistory();
  const wrapperRef = useRef();
  useEffect(() => {
    wrapperRef && wrapperRef.current && wrapperRef.current.focus();
  }, [pageNum]);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (pageNum > 0) setPage(--pageNum);
    } else if (e.key === "ArrowRight") {
      if (pageNum + 1 < pageMax) setPage(++pageNum);
      else history.push("/");
    } else if (e.key === "Escape") {
      history.push("/");
      setShow(false);
    }
  };
  return (
    <div
      className="onboarding__wrapper"
      ref={wrapperRef}
      tabIndex="-1"
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (e.target.className === "onboarding__wrapper") {
          history.push("/");
          setShow(false);
        }
      }}
    >
      <div
        className="onboarding__display__wrapper"
        onClick={() => {
          wrapperRef && wrapperRef.current && wrapperRef.current.focus();
        }}
      >
        <div className="wrapper--horizontal">
          <div className="wrapper">
            <div className="onboarding__display__title">{title}</div>
            <div className="onboarding__display__image">
              <img src={img} alt="" />
            </div>
            <div className="onboarding__display__bottom">
              <div
                className="onboarding__display__button--previous"
                onClick={
                  setPage
                    ? () => setPage(--pageNum)
                    : console.log("Forgot to pass in goBack funct")
                }
              >
                {pageNum > 0 ? (
                  <>
                    <img src={arrowLeft} alt=""></img> Previous
                  </>
                ) : (
                  <> </>
                )}
              </div>
              <div
                className="onboarding__display__button--next"
                onClick={
                  setPage
                    ? () => setPage(++pageNum)
                    : console.log("Forgot to pass in goforward funct")
                }
              >
                {pageNum < pageMax - 1 ? (
                  <>
                    Next
                    <img src={arrowRight} alt=""></img>
                  </>
                ) : (
                  <> </>
                )}
              </div>
            </div>
            <div
              className="onboarding__toggle"
              onClick={() => {
                window.localStorage.setItem("showOnboarding", false);
                history.push("/");
                setShow(false);
              }}
            >
              Do not show again
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
