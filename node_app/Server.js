const bodyParser = require("body-parser");

// Import Middleware Functions
const FetchUserMiddleware = require("./Middleware/FetchUser");
const AddUserMiddleware = require("./Middleware/Users/AddUser");

const GetRecipeById = require("./Middleware/Recipes/GetRecipeById");
const GetAllRecipes = require("./Middleware/Recipes/GetAllRecipes");
const CreateRecipe = require("./Middleware/Recipes/CreateRecipe");
const UpdateRecipe = require('./Middleware/Recipes/UpdateRecipe');
const DeleteRecipe = require("./Middleware/Recipes/DeleteRecipe");

// Instantiate express and App Object
const express = require('express');
const app = express();

// Declaring the Port variable
const PORT = 80;
app.use(bodyParser.json());

// Check ./Middleware/HelloWorld.js to see what is happening with "req.locals.phrase"
app.get("/user", FetchUserMiddleware, (req, res) => {
    if (res.locals.validUser) {
        return res.send({nodeStatus: 200});
    } else if (res.locals.nonValidUser) {
        return res.send({ nodeStatus: 401 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 404,
            error: res.locals.error
        });
    }
});

app.post("/user", AddUserMiddleware, (req, res) => {
    if (res.locals.addedUser) {
        return res.send({ nodeStatus: 200 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 400,
            error: res.locals.error
        });
    }
});

app.get("/recipes", GetAllRecipes, (req, res) => {
    res.send(res.locals.data);
});

app.get("/recipes/:id", GetRecipeById, (req, res) => {
    res.send(res.locals.data);
});

app.post("/recipes", CreateRecipe, (req, res) => {
    if (res.locals.addedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus:400,
            error: res.locals.error
        });
    }
});

app.put("/recipes/:id", UpdateRecipe, (req, res) => {
    if(res.locals.updatedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus:400,
            error: res.locals.error
        });
    }
});

app.delete("/recipes/:id", DeleteRecipe, (req, res) => {
    if  (res.locals.deletedRecipe){
        return res.send({ nodeStatus: 200 });
    } else if(res.locals.error) {
        return res.send({
            nodeStatus: 400,
            error: res.locals.error
        });
    }
});

app.use("*", (req, res) => {
    res.status(404).send("Node.js -> No Routes Matched");
});

// Invoke the express app to listen on the provided Port number
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});