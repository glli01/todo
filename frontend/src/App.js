import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
function App() {
  return (
    <>
      <Router>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/lists/:id" component={ListScreen} />
      </Router>
    </>
  );
}

export default App;
