import React, { useState, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import globalFormStyles from '../../../GlobalFormStyles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const formClasses = globalFormStyles();

  const [recipeName, setRecipeName] = useState('');
  const [recipeIntro, setRecipeIntro] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [directions, setDirections] = useState(['']);
  const[recipeID, setRecipeID] = useState('');
  const[redirectFire, setRedirectFire] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Recipe name: ${recipeName}\nRecipe ID: ${recipeID}\nRecipe Intro: ${recipeIntro}\nCook Time: ${cookTime}\nPrep Time:${prepTime}\nServings: ${servings}\nIngredients: ${ingredients}\nDirections: ${directions}`);
    saveRecipe();
  }

  const handleRecipeNameConversion = (e) => {
    setRecipeName(e.target.value);
    setRecipeID(e.target.value.toLowerCase().split(' ').join('_'));
  }

  const handleAddIngredients = () => {
    const values = [...ingredients];
    values.push('');
    setIngredients(values);
  }

  const handleRemoveIngredients = index => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  }

  const handleAddDirections = () => {
    const values = [...directions];
    values.push('');
    setDirections(values);
  }

  const handleRemoveDirections = index => {
    const values = [...directions];
    values.splice(index, 1);
    setDirections(values);
  }

  const handleIngredientChange = (index,event) => {
      const values = [...ingredients];
      values[index] = event.target.value;
      setIngredients(values);
  }

  const handleDirectionChange = (index, event) => {
    const values = [...directions];
    values[index] = event.target.value;
    setDirections(values);
  }

  const saveRecipe = () => {
      //Will eventually make post call to java backend
      setRedirectFire(true);
  }

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
          Create Recipe
        </Typography>
        <form className={formClasses.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="recipeName"
            label="Recipe Name"
            name="recipeName"
            autoComplete="recipeName"
            autoFocus
            onChange={e => handleRecipeNameConversion(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows="4"
            fullWidth
            name="recipe_intro"
            label="Recipe Description"
            id="recipe_intro"
            autoComplete="recipe_intro"
            onChange={e => setRecipeIntro(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="cookTime"
            label="Cook Time"
            id="cookTime"
            autoComplete="cookTime"
            onChange={e => setCookTime(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="prepTime"
            label="Prep Time"
            id="prepTime"
            autoComplete="prepTime"
            onChange={e => setPrepTime(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="servings"
            label="Servings"
            id="servings"
            autoComplete="servings"
            onChange={e => setServings(e.target.value)}
          />

          {ingredients.map((ingredient,index) => (
            <Fragment key={`${index}`}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="ingredient"
                    label="Ingredient"
                    id="ingredient"
                    onChange={event => handleIngredientChange(index, event)}
                />
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveIngredients(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddIngredients()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
         
         {directions.map((direction,index) => (
            <Fragment key={`${index}`}>
               <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="direction"
                    label="Direction"
                    id="direction"
                    onChange={event => handleDirectionChange(index, event)}
                />
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveDirections(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddDirections()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}

          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={formClasses.submit}
                > 
                    Save Recipe
         </Button>
         <Button
                type="button"
                fullWidth
                className={formClasses.submit}
                variant="contained"
                color="secondary"
                href="./recipe"
                >
            Cancel
        </Button>
        </form>
      </div>
    </Container>
  );
}