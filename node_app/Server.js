const bodyParser = require("body-parser");

// Import Middleware Functions
const FetchUserMiddleware = require("./Middleware/FetchUser");
const AddUserMiddleware = require("./Middleware/AddUser");
const AddRecipeMiddleware = require("./Middleware/AddRecipe");
const DeleteRecipeMiddleware = require("./Middleware/DeleteRecipe");
//const UpdateRecipeMiddleware = require('./Middleware/UpdateRecipe');

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
    };
});

app.post("/user", AddUserMiddleware, (req, res) => {
    if (res.locals.addedUser) {
        return res.send({ nodeStatus: 200 });
    } else if (res.locals.error) {
        return res.send({
            nodeStatus: 400,
            error: res.locals.error
        });
    };
});

app.post("/make-recipe", AddRecipeMiddleware, (req, res) => {
    res.send();
});

app.delete("/remove-recipe", DeleteRecipeMiddleware, (req,res) => {
    res.send();
});

// app.put("/update-recipe", UpdateRecipeMiddleware, (req,res) => {
//     res.send(res.locals.data);
// })

app.use("*", (req, res) => {
    res.status(404).send("Node.js -> No Routes Matched");
});

// Invoke the express app to listen on the provided Port number
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});