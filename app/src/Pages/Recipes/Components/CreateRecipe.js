import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import globalFormStyles from '../../../GlobalFormStyles';
import RecipeFormComponent from '../Components/RecipeFormComponent';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  }
}));

export default () => {
  const classes = useStyles();
  const formClasses = globalFormStyles();

  const[redirectFire, setRedirectFire] = useState(false);

const handleDetails = async(details) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    };

    try {
        const fetchResponse = await fetch(`/recipes`, settings);
        const data = await fetchResponse.json();
        if (data.nodeStatus === 200) {
            setRedirectFire(true);
        } else if (data.nodeStatus === 400) {
            alert(`Unable to add recipe ${details.recipeName}`)
        } else {
            alert(`Unknown error...this site is broken :(`)
        }
        return;
    } catch(err) {
        return err;
    }
};

  if (redirectFire){
      return <Redirect push to="/recipe"/>
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={formClasses.paper}>
        <Avatar className={classes.avatar}>
          <RestaurantMenuRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Recipe
        </Typography>
          <RecipeFormComponent allDetails={handleDetails}/>
      </div>
    </Container>
  );
}