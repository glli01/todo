import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./Spinner";
const Logout = () => {
  const { loading } = useSelector((state) => state.user);
  return <>{loading ? <Spinner></Spinner> : <Redirect to="/"></Redirect>}</>;
};

export default Logout;
