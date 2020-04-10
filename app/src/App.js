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
import GlobalState from './Context/GlobalState';
import AppContext from './Context/app-context';

import NavBarComponent from './Shared/NavBarComponent/NavBarComponent';
import MikeyTicTacToe from './Pages/MikeyTicTacToe/Pages/MikeyApp/MikeyApp';
import EmmaTicTacToe from './Pages/EmmaTicTacToe/EmmaTicTacToe';

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
                <NavBarComponent />
                <RecipePage />
              </Route>
              <Route path="/dashboard">
                <NavBarComponent />
                <DashboardPage />
              </Route>
              <Route path="/mikey-tic-tac-toe">
                <NavBarComponent />
                <MikeyTicTacToe />
              </Route>
              <Route path="/emma-tic-tac-toe">
                  <NavBarComponent />
                  <EmmaTicTacToe />
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