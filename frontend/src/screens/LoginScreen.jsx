import React from "react";
// import bcrypt from "bcryptjs";
import { USER_SET_GUEST } from "../features/user/constants/userConstants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/actions/userActions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router";
import { getAllTasks } from "../features/tasks/actions/tasksActions";
import { getLists } from "../features/lists/actions/listsActions";
const LoginScreen = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, message, success, error, user, guest } = useSelector(
    (state) => state.user
  );
  const handleKeyDown = (e) => {
    if (e.which === 13) {
      console.log("got enter key");
      dispatch(getUser(email, password));
    }
  };
  useEffect(() => {
    document.title = "Todooos | Login";
    if (success) {
      history.push("/");
      dispatch(getAllTasks());
      dispatch(getLists(guest));
    }
  }, [success]);
  return (
    <>
      {success && user._id && <Redirect to="/"></Redirect>}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
              <div
                className="wrapper"
                onClick={() => {
                  dispatch({ type: USER_SET_GUEST });
                }}
              >
                <div className="wrapper--horizontal">
                  <Link className="button" to={`/`}>
                    Continue as Guest
                  </Link>
                </div>
              </div>
              <div
                className={
                  success
                    ? "login__message--success"
                    : "login__message--failure"
                }
              >
                {success ? message : error}
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default LoginScreen;
