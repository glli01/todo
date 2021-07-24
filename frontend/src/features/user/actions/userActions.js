import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
// import bcrypt from "bcryptjs";
export const getUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const body = { email, password };
    const { data } = await axios.post(`/login/`, body);
    console.log(password);
    console.log(data.password);
    if (data && data._id) {
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
