import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeAPIDetailsComponent(){
    const [recipes, setRecipes] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/recipes/5')
        .then(res => {
            setRecipes(res.data);
            setLoad(true);
        })
        .catch(err => {
            setError(err.message);
            setLoad(true);
        });
    },[]);

    if(load)
    {
        return (
            <div>
                {
                    error ? <p>{error.message}</p> :

                    recipes.map((recipe, index) =>
                        <ul>
                            <li key={index}>{recipe.title}</li>
                            <li key={index}>{recipe.cuisine}</li>
                            <li key={index}>{recipe.description}</li>
                            <li>INGREDIENTS
                                <ul>
                                    {recipe.ingredientList.map((item,idx) =>
                                        <li key={idx}>{item.quantity} {item.name}</li>
                                    )}
                                </ul>
                            </li>
                            <li key={index}>{recipe.instructions}</li>
                        </ul>)

                }
            </div>
            );
    }
    else
    {
        return(
            <div>
                Loading ...
            </div>
        );
    }
};

export default RecipeAPIDetailsComponent;