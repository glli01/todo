import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_FAIL,
  LIST_ADD_LOCAL,
  LIST_DETAILS_SUCCESS,
} from "../constants/listsConstants";
import axios from "axios";

export const getLists =
  (guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: LIST_REQUEST });
        console.log("dispatched");
        const { data } = await axios.get("/api/lists");
        dispatch({
          type: LIST_SUCCESS,
          payload: data,
        });
        console.log("success");
      } catch (error) {
        dispatch({
          type: LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
      const state = window.localStorage.getItem("state");
    }
  };

export const addList = (list, guest) => async (dispatch) => {
  if (!guest) {
  } else {
    const state = JSON.parse(window.localStorage.getItem("state"));
    const newState = state
      ? { ...state, lists: [...state.lists, list] }
      : { lists: [list] };
    window.localStorage.setItem("state", JSON.stringify(newState));
    // console.log("local storage set");
    // console.log(window.localStorage.getItem("state"));
    dispatch({ type: LIST_ADD_LOCAL, payload: list });
  }
};
export const getList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DETAILS_REQUEST,
    });
    console.log("dispatched");
    const { data } = await axios.get(`/api/lists/${id}`);
    dispatch({
      type: LIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
