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
    case TASK_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, { ...action.payload }],
      };
    }
    case TASK_ADD_REQUEST: {
      return { ...state, loading: true };
    }
    case TASK_ADD_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case TASK_LOGOUT:
      return { loading: false, tasks: [] };
    default:
      return state;
  }
};
