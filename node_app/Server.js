// Import Middleware Functions
const HelloWorldMiddleware = require("./Middleware/HelloWorld");

// Instantiate express and App Object
const express = require('express');
const app = express();

// Declaring the Port variable
const PORT = 8081;

// Check ./Middleware/HelloWorld.js to see what is happening with "req.locals.phrase"
app.get("/", HelloWorldMiddleware, (req, res) => {
    // This Arrow Function is considered a Middleware Function

    // This method returns res.locals.phrase to the client with a 200 OK by default
    res.send(res.locals.phrase);
});

// Invoke the express app to listen on the provided Port number
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
});