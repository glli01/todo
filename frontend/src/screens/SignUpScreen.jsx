import React from "react";
// import bcrypt from "bcryptjs";
import { USER_SET_GUEST } from "../features/user/constants/userConstants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/user/actions/userActions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router";
import { getAllTasks } from "../features/tasks/actions/tasksActions";
import { getLists } from "../features/lists/actions/listsActions";
import bird from "../assets/img/bird.svg";
const LoginScreen = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { loading, message, success, error, user, guest } = useSelector(
    (state) => state.user
  );
  const handleKeyDown = (e) => {
    if (e.which === 13) {
      console.log("got enter key");
      dispatch(createUser(email, firstName, lastName, password));
    }
  };
  useEffect(() => {
    document.title = "Sign Up | Todooos";
    if (success) {
      history.push("/");
      dispatch(getAllTasks());
      dispatch(getLists(guest));
    }
  }, [success, guest, dispatch, history]);
  return (
    <>
      {success && user._id && <Redirect to="/"></Redirect>}
      {
        <div className="login__wrapper">
          <div className="login__title">
            <img src={bird} alt=""></img> <div>todooos</div>
          </div>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <div className="login__form">
              <div className="login__form__title">Sign up for free</div>
              <div className="wrapper--between">
                <div className="signup__form__input first-name">
                  First Name
                  <input
                    type="text"
                    value={firstName}
                    placeholder=""
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="signup__form__input last-name">
                  Last Name
                  <input
                    type="text"
                    value={lastName}
                    placeholder=""
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
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
                  type="Password"
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
                    dispatch(createUser(email, firstName, lastName, password));
                  }}
                  className="button--primary"
                  to={`/signup/?email=${email}`}
                >
                  Sign up
                </Link>
                <Link to={`/login/`} className="button--secondary">
                  Cancel
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
