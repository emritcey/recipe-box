import React, { useEffect, useState, Fragment, useContext} from 'react';
import { Redirect } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import globalFormStyles from '../../../GlobalFormStyles';
import AppContext from '../../../Context/app-context';

export default (props) => {
    const formClasses = globalFormStyles();
    const context = useContext(AppContext);

    const[recipe_id, setRecipeID] = useState('');
    const [recName, setRecName] = useState('');
    const [recipeIntro, setRecipeIntro] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [directions, setDirections] = useState(['']);
    const [cancellationFire, setCancellationFire] = useState(false);

    useEffect(() => {
        if (props.recipeDetails && props.recipeDetails.recipe_id) {
            setRecipeID(props.recipeDetails.recipe_id);
            setRecName(props.recipeDetails.recipe_name);
            setRecipeIntro(props.recipeDetails.recipe_intro);
            setCookTime(props.recipeDetails.cook_time);
            setPrepTime(props.recipeDetails.prep_time);
            setServings(props.recipeDetails.servings);
            setIngredients(props.recipeDetails.ingredients || ['']);
            setDirections(props.recipeDetails.directions || ['']);
            setRecipeID(props.recipeDetails.recipe_id);
        }
    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmationString = `Recipe name: ${recName}\nRecipe ID: ${recipe_id}\nRecipe Intro: ${recipeIntro}\nCook Time: ${cookTime}\nPrep Time:${prepTime}\nServings: ${servings}\nIngredients: ${ingredients}\nDirections: ${directions}`;
        if (window.confirm(confirmationString)) {
            saveRecipe();
        } else {
            console.log('hit ancel');
        }
    };

    const cancelForm = (e) => {
        e.preventDefault();
        setCancellationFire(true);
    };

    const handleRecipeNameConversion = (e) => {
        setRecName(e.target.value);
        setRecipeID(e.target.value.toLowerCase().split(' ').join('_'));
    };

    const handleAddIngredients = () => {
        const values = [...ingredients];
        values.push('');
        setIngredients(values);
    };

    const handleRemoveIngredients = () => {
        const values = [...ingredients];
        if (values.length > 1) {
            values.pop();
            setIngredients(values);
        }
    };

    const handleAddDirections = () => {
        const values = [...directions];
        values.push('');
        setDirections(values);
    };

    const handleRemoveDirections = () => {
        const values = [...directions];
        if (values.length > 1) {
            values.pop();
            setDirections(values);
        }
    };

    const handleIngredientChange = (index,event) => {
        const values = [...ingredients];
        values[index] = event.target.value;
        setIngredients(values);
    };

    const handleDirectionChange = (index, event) => {
        const values = [...directions];
        values[index] = event.target.value;
        setDirections(values);
    };

    const saveRecipe = async() => {
        const data = {
            recipe_id: recipe_id,
            recipeName: recName,
            recipeIntro: recipeIntro,
            cookTime: cookTime,
            prepTime: prepTime,
            servings: servings,
            ingredients: ingredients,
            directions: directions,
            userName: context.currentUserName,
        };
        props.allDetails(data);
    };

    if (cancellationFire) {
        return <Redirect push to="/recipe" />
    }

    return (
        <form className={formClasses.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                disabled={!!props.recipeDetails}
                fullWidth
                value={recName}
                label="Recipe Name"
                onChange={e => handleRecipeNameConversion(e)}/>
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                required
                rows="4"
                fullWidth
                value={recipeIntro}
                label="Recipe Description"
                onChange={e => setRecipeIntro(e.target.value)}/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={cookTime}
                label="Cook Time"
                onChange={e => setCookTime(e.target.value)}/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={prepTime}
                label="Prep Time"
                onChange={e => setPrepTime(e.target.value)}/>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={servings}
                label="Servings"
                onChange={e => setServings(e.target.value)}/>
            <Card className={formClasses.root}>
                <CardContent>
                    <h3>Ingredients</h3>
                    {ingredients.map((ingredient,index) => (
                        <Fragment key={`${index}`}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={ingredient}
                                label="Ingredient"
                                onChange={event => handleIngredientChange(index, event)}/>
                        </Fragment>
                    ))}
                    <div className="form-group col-sm-2">
                        <IconButton onClick={() => handleRemoveIngredients()}>
                            <RemoveCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAddIngredients()}>
                            <AddCircleIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>


            <Card className={formClasses.root}>
                <CardContent>
                    <h3>Directions</h3>
                    {directions.map((direction,index) => (
                        <Fragment key={`${index}`}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={direction}
                                label="Direction"
                                onChange={event => handleDirectionChange(index, event)}
                            />
                        </Fragment>
                    ))}
                    <div className="form-group col-sm-2">
                        <IconButton onClick={() => handleRemoveDirections()}>
                            <RemoveCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAddDirections()}>
                            <AddCircleIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={formClasses.submit}>
                Save Recipe
            </Button>
            <Button
                type="button"
                fullWidth
                className={formClasses.submit}
                variant="contained"
                color="secondary"
                onClick={cancelForm}>
                Cancel
            </Button>
        </form>
    );
}
