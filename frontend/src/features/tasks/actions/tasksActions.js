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
  TASK_DELETE,
  TASK_PUT_FAIL,
  TASK_PUT_REQUEST,
  TASK_PUT_SUCCESS,
  TASK_TOGGLE_COMPLETED,
} from "../constants/tasksConstants";
import axios from "axios";

export const deleteTask =
  (task, guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: TASK_DELETE_REQUEST });
        dispatch({ type: TASK_DELETE, id: task._id });
        const data = await axios.delete(`/api/tasks/${task._id}`);
        if (data) {
          dispatch({ type: TASK_DELETE_SUCCESS, id: task._id });
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
          original: task,
        });
      }
    } else {
      const state = JSON.parse(window.localStorage.getItem("state"));
      const newState = state
        ? {
            ...state,
            tasks: state.tasks
              ? [...state.tasks].filter((tasc) => tasc._id !== task._id)
              : [],
          }
        : { tasks: [task] };
      window.localStorage.setItem("state", JSON.stringify(newState));
      dispatch({ type: TASK_DELETE_SUCCESS, payload: task });
    }
  };

export const toggleTaskCompleted =
  (id, guest = false) =>
  async (dispatch) => {
    if (!guest) {
      try {
        dispatch({ type: TASK_PUT_REQUEST });
        dispatch({ type: TASK_TOGGLE_COMPLETED, id: id });
        const { data } = await axios.put(`/api/tasks/${id}/complete`);
        if (data) {
          dispatch({ type: TASK_PUT_SUCCESS, payload: data });
        } else {
          throw new Error("Failed to delete task.");
        }
      } catch (error) {
        dispatch({
          type: TASK_PUT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
      dispatch({ type: TASK_TOGGLE_COMPLETED, id: id });
    }
  };

export const getAllTasks =
  (guest = false) =>
  async (dispatch) => {
    if (!guest) {
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
    } else {
      const state = JSON.parse(window.localStorage.getItem("state"));
      dispatch({ type: TASK_SUCCESS, payload: state ? state.tasks : null });
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
