import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_FAIL,
  LIST_DETAILS_SUCCESS,
} from "../constants/listsConstants";
import axios from "axios";

export const getLists = () => async (dispatch) => {
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
};

export const getList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DETAILS_REQUEST,
    });
    console.log("dispatched");
    const { data } = await axios.get(`/api/list/${id}`);
    dispatch({
      type: LIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
