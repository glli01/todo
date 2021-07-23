import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, loading: true, user: {} };
    }
    case USER_LOGIN_SUCCESS: {
      return { ...state, loading: false, user: action.payload };
    }
    case USER_LOGIN_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
