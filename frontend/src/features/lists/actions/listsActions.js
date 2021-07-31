import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_FAIL,
  LIST_ADD,
  LIST_DETAILS_SUCCESS,
  LIST_ADD_REQUEST,
  LIST_ADD_FAIL,
  LIST_ADD_SUCCESS,
  LIST_DELETE_REQUEST,
  LIST_DELETE_FAIL,
  LIST_DELETE_SUCCESS,
  LIST_DELETE,
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
      const state = JSON.parse(window.localStorage.getItem("state"));
      dispatch({ type: LIST_SUCCESS, payload: state ? state.lists : null });
    }
  };

export const addList =
  (list, guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: LIST_ADD_REQUEST });
        const { data } = await axios.post("/api/lists", list);
        console.log("got data and it is");
        console.log(data);
        if (data && data._id) {
          dispatch({ type: LIST_ADD_SUCCESS, payload: data });
        }
      } catch (error) {
        dispatch({
          type: LIST_ADD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
      const state = JSON.parse(window.localStorage.getItem("state"));
      const newState = state
        ? { ...state, lists: [...state.lists, list] }
        : { lists: [list] };
      window.localStorage.setItem("state", JSON.stringify(newState));
      // console.log("local storage set");
      // console.log(window.localStorage.getItem("state"));
      dispatch({ type: LIST_ADD, payload: list });
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

export const deleteList =
  (list, guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: LIST_DELETE_REQUEST });
        dispatch({ type: LIST_DELETE, id: list._id });
        const data = await axios.delete(`/api/lists/${list._id}`);
        if (data) {
          dispatch({ type: LIST_DELETE_SUCCESS, id: list._id });
        } else {
          throw new Error("Failed to delete list.");
        }
      } catch (error) {
        dispatch({
          type: LIST_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          original: list,
        });
      }
    } else {
      const state = JSON.parse(window.localStorage.getItem("state"));
      const newState = state
        ? {
            ...state,
            lists: state.lists
              ? [...state.lists].filter((lis) => lis._id !== list._id)
              : [],
          }
        : { lists: [list] };
      window.localStorage.setItem("state", JSON.stringify(newState));
      dispatch({ type: LIST_DELETE_SUCCESS, payload: list });
    }
  };
