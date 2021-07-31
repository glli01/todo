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
  }, [success, dispatch, guest, history]);
  return (
    <>
      {success && user._id && <Redirect to="/"></Redirect>}
      {
        <div className="login__wrapper">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <div className="login__form">
              <div className="login__form__title">Sign in</div>
              <div className="login__form__input">
                Email
                <input
                  type="text"
                  value={email}
                  placeholder=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="login__form__input">
                Password
                <input
                  type="password"
                  value={password}
                  placeholder=""
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="wrapper--between login__button__wrapper">
                <Link
                  onClick={() => {
                    dispatch(getUser(email, password));
                  }}
                  className="button--primary"
                  to={`/login/?email=${email}`}
                >
                  Log in
                </Link>
                <Link
                  to={`/signup/`}
                  // onClick={() => {
                  //   dispatch(getUser(email, password));
                  // }}
                  className="button--secondary"
                >
                  Sign up
                </Link>
              </div>
              <div
                className="wrapper"
                onClick={() => {
                  dispatch({ type: USER_SET_GUEST });
                }}
              >
                <div className="wrapper--horizontal">
                  <Link className="button" to={`/`}>
                    Don't want to sign in? Continue as a Guest...
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
