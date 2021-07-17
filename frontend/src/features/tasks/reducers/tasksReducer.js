import Task from "../../../components/Task";
import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
  TASK_TOGGLE_COMPLETED,
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

    default:
      return state;
  }
};
