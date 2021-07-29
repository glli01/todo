import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  // TASK_TOGGLE_COMPLETED,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  // TASK_DELETE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_ADD_LOCAL,
  TASK_DELETE,
} from "../constants/tasksConstants";
import axios from "axios";
import { bindActionCreators } from "redux";

export const deleteTask =
  (task, guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: TASK_DELETE_REQUEST });
        const { data } = await axios.delete(`/tasks/${task._id}`);
        if (data && data.success === true) {
          dispatch({ type: TASK_DELETE_SUCCESS });
        } else {
          throw new Error("Failed to delete task.");
        }
      } catch (error) {
        dispatch({
          type: TASK_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
    }
  };
export const getAllTasks = (task) => async (dispatch) => {
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

export const createNewTask =
  (task, guest = false) =>
  async (dispatch) => {
    if (!guest) {
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
    } else {
      const state = JSON.parse(window.localStorage.getItem("state"));
      const newState = state
        ? { ...state, tasks: state.tasks ? [...state.tasks, task] : [task] }
        : { tasks: [task] };
      window.localStorage.setItem("state", JSON.stringify(newState));
      dispatch({ type: TASK_ADD_SUCCESS, payload: task });
    }
  };

// export const toggleCompleted = (id) => (dispatch) => {
//   dispatch({ type: TASK_TOGGLE_COMPLETED, id });
// };
