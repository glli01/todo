import React from "react";
import OnBoarding from "../components/OnBoarding";
import slide1 from "../assets/img/slide-1.svg";
import slide2 from "../assets/img/slide-2.svg";
import slide3 from "../assets/img/slide-3.svg";
import slide4 from "../assets/img/slide-4.svg";
import slide5 from "../assets/img/slide-5.svg";
import slide6 from "../assets/img/slide-6.svg";
import slide7 from "../assets/img/slide-7.svg";
import slide8 from "../assets/img/slide-8.svg";
import slide9 from "../assets/img/slide-9.svg";
import slide10 from "../assets/img/slide-10.svg";
import { useState } from "react";
const onBoardingScreens = [
  {
    img: slide1,
    title: "Welcome to todooos",
  },
  {
    img: slide2,
    title: "Navigating the sidebar",
  },
  {
    img: slide3,
    title: "Navigating the sidebar",
  },
  {
    img: slide4,
    title: "Navigating the list",
  },
  {
    img: slide5,
    title: "Navigating the list",
  },
  {
    img: slide6,
    title: "Navigating the list",
  },
  {
    img: slide7,
    title: "Navigating the list",
  },
  {
    img: slide8,
    title: "Navigating the list",
  },
  {
    img: slide9,
    title: "Navigating the list",
  },
  {
    img: slide10,
    title: "-",
  },
];
const OnboardingOverlay = () => {
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <OnBoarding
          img={onBoardingScreens[page].img}
          title={onBoardingScreens[page].title}
          pageNum={page}
          setPage={setPage}
          pageMax={onBoardingScreens.length}
          setShow={setShow}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default OnboardingOverlay;
