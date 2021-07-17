import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listDetailsReducer,
  listsReducer,
} from "./features/lists/reducers/listsReducer.js";
const reducer = combineReducers({
  lists: listsReducer,
  list: listDetailsReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
