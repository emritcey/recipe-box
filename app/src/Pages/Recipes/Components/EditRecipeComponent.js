import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useRouteMatch } from "react-router-dom";
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
    let match = useRouteMatch();

    const [recipeDetails, setRecipeDetails] = useState({});
    const [redirectFire, setRedirectFire] = useState(false);

    const handleDetails = async(details) => {
        const settings = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
        };

        try {
            const fetchResponse = await fetch(`/recipes/${details.recipe_id}`, settings);
            const data = await fetchResponse.json();
            if (data.nodeStatus === 200) {
                setRedirectFire(true);
            } else if (data.nodeStatus === 400) {
                alert(`Unable to update recipe ${details.recipeName}`)
            } else {
                alert(`Unknown error...this site is broken :(`)
            }
            return;
        } catch(err) {
            return err;
        }
    };

    useEffect(() => {
        const getRecipeDetails = async() => {
            try {
                const response = await fetch(`/recipes/${match.params.recipe_id}`);
                const data = await response.json();
                setRecipeDetails(data.Item);
            } catch(err) {
                alert(`Unable to find recipe. Error: ${err}`)
            }
        };

        getRecipeDetails();
    }, [match]);

    if(redirectFire){
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
                    Edit Recipe
                </Typography>
                <RecipeFormComponent allDetails={handleDetails} recipeDetails={recipeDetails}/>
            </div>
        </Container>
    );
}