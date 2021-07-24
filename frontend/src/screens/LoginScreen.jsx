import React from "react";
// import bcrypt from "bcryptjs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/actions/userActions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router";
const LoginScreen = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, message, success, error, user } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);
  return (
    <>
      {user._id && <Redirect to="/"></Redirect>}
      {
        <div className="login__wrapper">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <div className="login__form">
              <div className="login__form__input">
                <input
                  type="text"
                  value={email}
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="login__form__input">
                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <Link to={`/login/?email=${email}`}>
                <button
                  onClick={() => {
                    dispatch(getUser(email, password));
                  }}
                  className="login__button--submit"
                >
                  login
                </button>
              </Link>
              <div className="login__message">{success ? message : error}</div>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default LoginScreen;
