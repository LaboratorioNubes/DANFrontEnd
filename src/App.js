import "./App.css";
import SignIn from "./containers/SignIn/SignIn.js";
import SignUp from "./containers/SignUp/SignUp";
import HomeView from "./containers/HomeView/HomeView";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/signIn">
            <SignIn />
          </Route>  
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </header>
      </div>
    </Router>
  );
}

export default App;
