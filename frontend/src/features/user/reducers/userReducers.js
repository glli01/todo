import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, loading: true, user: {}, success: null };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        message: action.message,
        success: action.success,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: action.message,
        success: action.success,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return { ...state, loading: false, user: {}, success: false };
    }
    default:
      return state;
  }
};
