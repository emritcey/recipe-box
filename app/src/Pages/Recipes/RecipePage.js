import React from 'react';
import ListRecipesComponent from './Components/ListRecipesComponent';
import CreateRecipe from './Components/CreateRecipe';
import { useRouteMatch, Switch, Route } from "react-router-dom";

function RecipePage() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <CreateRecipe />
      </Route>
      <Route path={match.path}>
        <div>
          <h1>Recipe Page</h1>
          <ListRecipesComponent />
        </div>
      </Route>
    </Switch>
  );
};

export default RecipePage;