import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListSidebar from "./features/lists/components/ListSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "./features/lists/actions/listsActions.js";
function App() {
  return (
    <>
      <Router>
        <div className="main">
          <ListSidebar></ListSidebar>

          <div class="content">
            <Route path="/" component={HomeScreen} exact />
            <Route path="/lists/:id" component={ListScreen} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
