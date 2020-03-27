import React from 'react';
import DisplayDBRecipeListComponent from './Components/DisplayDBRecipeListComponent';
import CreateRecipe from './Components/CreateRecipe';
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles/index";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
    recipeTitle: {
        textAlign: "center",
    },
}));

function RecipePage() {
  let match = useRouteMatch();
  const classes = useStyles();

  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <CreateRecipe />
      </Route>
      <Route path={match.path}>
          <Container maxWidth="sm">
              <h1 className={classes.h1}>Your Recipes</h1>
              <DisplayDBRecipeListComponent />
          </Container>
      </Route>
    </Switch>
  );
};

export default RecipePage;