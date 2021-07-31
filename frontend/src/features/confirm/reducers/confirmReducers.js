import {
  CONFIRM_CLOSE,
  CONFIRM_NO,
  CONFIRM_OPEN,
  CONFIRM_YES,
} from "../constants/confirmConstants";

export const confirmReducer = (
  state = {
    success: false,
    open: false,
  },
  action
) => {
  switch (action.type) {
    case CONFIRM_CLOSE:
      return { success: false, open: false };
    case CONFIRM_NO:
      return { open: false, success: false };
    case CONFIRM_YES:
      return { open: false, success: true };
    case CONFIRM_OPEN:
      return { open: true, success: false, list: action.list, type: "list" };
    default:
      return state;
  }
};
