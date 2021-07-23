import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import bcrypt from "bcryptjs";
export const getUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.get(`/login/?email=${email}`);
    console.log(password);
    console.log(data.password);
    console.log(bcrypt.compareSync(password, data.password));
    if (bcrypt.compareSync(password, data.password)) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
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
    });
  }
};
