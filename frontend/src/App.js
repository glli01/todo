import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListSidebar from "./components/ListSidebar";
import LoginScreen from "./screens/LoginScreen";
import Logout from "./components/Logout";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithToken } from "./features/user/actions/userActions.js";
import SignUpScreen from "./screens/SignUpScreen";
import TodayScreen from "./screens/TodayScreen";
import ConfirmOverlay from "./screens/ConfirmOverlay";
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserWithToken());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(getLists(guest));
  // }, [guest]);
  return (
    <>
      <Router>
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={SignUpScreen} />
        <ConfirmOverlay></ConfirmOverlay>
        <div className="main">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <ListSidebar></ListSidebar>
              <div className="content">
                <Route path="/today" component={TodayScreen} />
                <Route path="/" component={HomeScreen} exact />
                <Route path="/lists/:id" component={ListScreen} />
                <Route path="/logout" component={Logout} exact />
              </div>
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
