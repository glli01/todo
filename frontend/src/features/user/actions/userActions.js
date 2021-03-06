import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";
import { TASK_LOGOUT } from "../../tasks/constants/tasksConstants";
import { LIST_LOGOUT } from "../../lists/constants/listsConstants";
import axios from "axios";
// import bcrypt from "bcryptjs";
import { getLists } from "../../lists/actions/listsActions.js";
import { getAllTasks } from "../../tasks/actions/tasksActions";
// import bcrypt om "bcryptjs";

export const getUserWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.get(`/login/verify/?hOtoken=true`);
    if (data && (data.firstName || data.name)) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
        message: "Success",
        success: true,
      });
      dispatch(getLists(false));
      dispatch(getAllTasks(false));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      message: "Login Failed",
      success: false,
    });
    console.log(`Error: ${error.message}`);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.delete("/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS });
    dispatch({ type: LIST_LOGOUT });
    dispatch({ type: TASK_LOGOUT });
    dispatch(getLists(true));
    dispatch(getAllTasks(true));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export const createUser =
  (email, firstName, lastName, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const body = { email, firstName, lastName, password };
      const { data } = await axios.post("/signup", body);
      if (data && data.token) {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: data,
          message: "Success",
          success: true,
        });
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        message: "Signup Failed",
        success: false,
      });
    }
  };

export const getUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const body = { email, password };
    const { data } = await axios.post(`/login/`, body);
    if (data && data.token) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
        message: "Success",
        success: true,
      });
    } else {
      throw new Error("Incorrect password or email address.");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      message: "Login Failed",
      success: false,
    });
  }
};
