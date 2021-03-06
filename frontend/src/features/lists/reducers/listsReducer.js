import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_ADD,
  LIST_DETAILS_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_LOGOUT,
  LIST_ADD_SUCCESS,
  // LIST_ADD_LOCAL,
  LIST_DELETE,
  LIST_DELETE_FAIL,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  LIST_SET_ACTIVE,
  LIST_ADD_REQUEST,
  LIST_ADD_FAIL,
} from "../constants/listsConstants";

export const listsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return { loading: true, lists: [] };
    case LIST_SUCCESS:
      return { loading: false, lists: action.payload };
    case LIST_FAIL:
      return { loading: false, error: action.payload };
    case LIST_LOGOUT:
      return { loading: false, lists: [] };
    case LIST_ADD:
      return {
        ...state,
        lists: state.lists
          ? [...state.lists, action.payload]
          : [action.payload],
      };
    case LIST_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        lists: state.lists
          ? [...state.lists, action.payload]
          : [action.payload],
      };
    }
    case LIST_ADD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LIST_ADD_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case LIST_SET_ACTIVE:
      return { ...state, active: action.payload };
    case LIST_DELETE: {
      const newlists = state.lists.filter((list) => list._id !== action.id);
      return { ...state, lists: newlists };
    }
    case LIST_DELETE_REQUEST: {
      return { ...state, loading: true };
    }
    case LIST_DELETE_FAIL: {
      const newlists = state.lists
        ? [action.original, ...state.lists]
        : [action.original];
      return { ...state, loading: false, error: action.error, lists: newlists };
    }
    case LIST_DELETE_SUCCESS: {
      const newlists = state.lists.filter((list) => list._id !== action.id);
      return { ...state, loading: false, lists: newlists };
    }
    default:
      return state;
  }
};

export const listDetailsReducer = (
  state = { list: { title: "loading" } },
  action
) => {
  switch (action.type) {
    case LIST_DETAILS_REQUEST:
      return { loading: true, list: {} };
    case LIST_DETAILS_SUCCESS:
      return { loading: false, list: action.payload };
    case LIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
