import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListSidebar from "./components/ListSidebar";
import LoginScreen from "./screens/LoginScreen";
function App() {
  return (
    <>
      <Router>
        <div className="main">
          <ListSidebar></ListSidebar>

          <div className="content">
            <Route path="/" component={HomeScreen} exact />
            <Route path="/lists/:id" component={ListScreen} />
            <Route path="/login" component={LoginScreen} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
