import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListSidebar from "./components/ListSidebar";
import LoginScreen from "./screens/LoginScreen";
import { getAllTasks } from "./features/tasks/actions/tasksActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);
  return (
    <>
      <Router>
        <Route path="/login" component={LoginScreen} />
        <div className="main">
          <ListSidebar></ListSidebar>

          <div className="content">
            <Route path="/" component={HomeScreen} exact />
            <Route path="/lists/:id" component={ListScreen} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
