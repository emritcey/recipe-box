const bodyParser = require("body-parser");

// Import Middleware Functions
const FetchOneUserMiddleware = require("./Middleware/FetchOneUser");
const AddRecipeMiddleware = require("./Middleware/AddRecipe");
//const UpdateRecipeMiddleware = require('./Middleware/UpdateRecipe');

// Instantiate express and App Object
const express = require('express');
const app = express();

// Declaring the Port variable
const PORT = 80;
app.use(bodyParser.json());

// Check ./Middleware/HelloWorld.js to see what is happening with "req.locals.phrase"
app.get("/retrieve-user", FetchOneUserMiddleware, (req, res) => {
    res.send(res.locals.data);
});
app.post("/make-recipe", AddRecipeMiddleware, (req, res) => {
    res.send();
});

// app.put("/update-recipe", UpdateRecipeMiddleware, (req,res) => {
//     res.send(res.locals.data);
// })

app.use("*", (req, res) => {
    res.status(404).send("No Routes Matched");
});

// Invoke the express app to listen on the provided Port number
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});