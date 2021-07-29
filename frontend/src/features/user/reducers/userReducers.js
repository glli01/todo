import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_SET_GUEST,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { ...state, loading: true, user: {}, success: null, guest: true };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        message: action.message,
        success: action.success,
        guest: false,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: action.message,
        success: action.success,
        guest: true,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: {},
        success: false,
        guest: true,
      };
    }
    case USER_SET_GUEST: {
      return { user: { _id: "guest" }, guest: true };
    }
    default:
      return state;
  }
};
