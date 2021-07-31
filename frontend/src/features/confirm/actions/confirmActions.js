import { CONFIRM_OPEN } from "../constants/confirmConstants";

export const confirmDelete = (eventHandler) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_OPEN });

    eventHandler();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
