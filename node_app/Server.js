const express = require('express');
const app = express();
const PORT = 8081;

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(PORT,() => {
    console.log(`App listening on ${PORT}`)
})