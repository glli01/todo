import React from "react"; //In this file we're using ESmodule react.
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import { getLists } from "./features/lists/actions/listsActions.js";
import { getAllTasks } from "./features/tasks/actions/tasksActions";

store.dispatch(getLists()); //call get list from api
store.dispatch(getAllTasks());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> {/*returns html code and adds it at root*/}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
