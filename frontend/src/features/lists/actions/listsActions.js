import {
  LIST_SUCCESS,
  LIST_FAIL,
  LIST_REQUEST,
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
