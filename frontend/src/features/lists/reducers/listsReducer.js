import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_ADD,
  LIST_DETAILS_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
} from "../constants/listsConstants";

export const listsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return { loading: true, lists: [] };
    case LIST_SUCCESS:
      return { loading: false, lists: action.payload };
    case LIST_FAIL:
      return { loading: false, error: action.payload };
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
      return { loading: false, lists: action.payload };
    case LIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
