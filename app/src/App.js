import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import RecipePage from './Components/RecipePage';
import SignUp from './Components/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipepage">
            <RecipePage />
          </Route>
          <Route path="/landingpage">
            <LandingPage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
};

export default App;