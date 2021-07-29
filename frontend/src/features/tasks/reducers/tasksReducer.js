import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  TASK_TOGGLE_COMPLETED,
  TASK_ADD_SUCCESS,
  TASK_ADD_FAIL,
  TASK_ADD_REQUEST,
  TASK_DELETE,
  TASK_LOGOUT,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_ADD_LOCAL,
  TASK_PUT_FAIL,
  TASK_PUT_SUCCESS,
  TASK_PUT_REQUEST,
} from "../constants/tasksConstants";

export const tasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_FAIL:
      return { loading: false, error: action.payload };
    case TASK_TOGGLE_COMPLETED: {
      const newTasks = [...state.tasks];
      const index = newTasks.findIndex((task) => task._id === action.id);
      newTasks[index] = {
        ...newTasks[index],
        isCompleted: !newTasks[index].isCompleted,
      };
      return { ...state, tasks: newTasks };
    }
    case TASK_DELETE: {
      const newTasks = state.tasks.filter((task) => task._id !== action.id);
      return { ...state, tasks: newTasks };
    }
    case TASK_DELETE_REQUEST: {
      return { ...state, loading: true };
    }
    case TASK_DELETE_FAIL: {
      return { ...state, loading: false, error: action.error };
    }
    case TASK_DELETE_SUCCESS: {
      const newTasks = state.tasks.filter((task) => task._id !== action.id);
      return { ...state, loading: false, tasks: newTasks };
    }
    case TASK_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: state.tasks
          ? [...state.tasks, { ...action.payload }]
          : [{ ...action.payload }],
      };
    }
    case TASK_ADD_REQUEST: {
      return { ...state, loading: true };
    }
    case TASK_ADD_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case TASK_ADD_LOCAL: {
      return {
        ...state,
        guest: true,
        tasks: state.tasks
          ? [...state.tasks, action.payload]
          : [action.payload],
      };
    }
    case TASK_PUT_REQUEST: {
      return { ...state, loading: true, original: state.tasks };
    }
    case TASK_PUT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        tasks: [...state.original],
      };
    }
    case TASK_PUT_SUCCESS: {
      const newTasks = state.tasks;
      newTasks && newTasks.filter((task) => task._id !== action.payload._id);
      newTasks.push(action.payload);
      return { ...state, tasks: newTasks };
    }
    case TASK_LOGOUT:
      return { loading: false, tasks: [] };
    default:
      return state;
  }
};
