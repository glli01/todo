import { createNewTask } from "../features/tasks/actions/tasksActions.js";
export const createGuestTask = (
  dispatch,
  id,
  list,
  title,
  isCompleted = false,
  description = "no description"
) => {
  const task = {
    _id: id.toString(),
    title,
    description,
    list,
    user: "guest",
    isCompleted: isCompleted,
  };
  dispatch(createNewTask(task, true));
};

export const getGuestTaskId = () => {
  const state = JSON.parse(window.localStorage.getItem("state"));
  const tasks = state ? state.tasks : null;
  return tasks ? Math.max(...tasks.map((task) => Number(task._id))) + 1 : 0;
};
