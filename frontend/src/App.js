import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListSidebar from "./components/ListSidebar";
import LoginScreen from "./screens/LoginScreen";
import Logout from "./components/Logout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithToken } from "./features/user/actions/userActions.js";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWithToken());
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
            <Route path="/logout" component={Logout} exact />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
