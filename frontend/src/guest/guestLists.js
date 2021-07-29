// responsible for all guest list actions.
export const getGuestListID = () => {
  const state = JSON.parse(window.localStorage.getItem("state"));
  const lists = state ? state.lists : null;
  return lists ? Math.max(...lists.map((list) => Number(list._id))) + 1 : 0;
};
