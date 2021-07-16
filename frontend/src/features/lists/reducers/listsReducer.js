import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_ADD,
} from "../constants/listsConstants";

export const listsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return { loading: true, lists: [] };
    case LIST_SUCCESS:
      return { loading: false, lists: action.payload };
    case LIST_ADD:
      return { loading: false, lists: state.lists.push(action.payload) };
    case LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
