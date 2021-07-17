import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
} from "../constants/tasksConstants";
import axios from "axios";
export const getTasksFromServer = () => async (dispatch) => {
  try {
    dispatch({ type: TASK_REQUEST });
    const { data } = await axios.get("/api/tasks");
    dispatch({ type: TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
