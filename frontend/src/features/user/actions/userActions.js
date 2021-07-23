import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
export const getUser = (email, password) => async (dispatch) => {
  try {
    dispatchEvent({ type: USER_LOGIN_REQUEST });
    const { data } = axios.get(`/login/?email=${username}`);
    dispatchEvent({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
