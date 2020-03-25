import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './Pages/Login/LoginPage';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import RecipePage from './Pages/Recipes/RecipePage';
import './App.css';
import GlobalState from './context/GlobalState';
import AppContext from './context/app-context';

const App = () => {
  return (
    <GlobalState>
      <AppContext.Consumer>
        {() => (
          <Router>
            <div>
              {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/recipe">
                  <RecipePage />
                </Route>
                <Route path="/dashboard">
                  <DashboardPage />
                </Route>
                <Route path="/">
                  <LoginPage />
                </Route>
              </Switch>
            </div>
          </Router>
        )}
      </AppContext.Consumer>
    </GlobalState>
    );
};

export default App;