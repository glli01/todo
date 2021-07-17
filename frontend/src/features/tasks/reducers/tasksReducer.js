import {
  TASK_REQUEST,
  TASK_SUCCESS,
  TASK_FAIL,
} from "../constants/tasksConstants";
export const taskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
