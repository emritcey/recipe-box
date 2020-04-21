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

import MikeyTicTacToe from './Pages/MikeyTicTacToe/Pages/MikeyApp/MikeyApp';
import EmmaTicTacToe from './Pages/EmmaTicTacToe/EmmaTicTacToe';
import PrivateRoute from './Shared/PrivateRoute';
import LogOutHandler from './Pages/LogOut/LogOutComponent';

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
                <PrivateRoute path="/recipe" component={RecipePage}/>
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/mikey-tic-tac-toe" component={MikeyTicTacToe} />
                <PrivateRoute path="/emma-tic-tac-toe" component={EmmaTicTacToe} />
                <Route path="/logout">
                  <LogOutHandler />
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