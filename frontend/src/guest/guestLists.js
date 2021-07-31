// responsible for all guest list actions.
export const getGuestListID = () => {
  const state = JSON.parse(window.localStorage.getItem("state"));
  const lists = state ? state.lists : null;
  console.log(lists);
  return lists && lists.length > 0
    ? Math.max(...lists.map((list) => Number(list._id))) + 1
    : 0;
};
