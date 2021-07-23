import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  TASK_TOGGLE_COMPLETED,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  TASK_DELETE,
} from "../constants/tasksConstants";
import axios from "axios";

export const getAllTasks = () => async (dispatch) => {
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

export const createNewTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_ADD_REQUEST });
    const { data } = await axios.post("/api/tasks", task);
    dispatch({ type: TASK_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TASK_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const toggleCompleted = (id) => (dispatch) => {
//   dispatch({ type: TASK_TOGGLE_COMPLETED, id });
// };
