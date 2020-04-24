const express = require("express");
const app = express();

const PORT = 3001;

app.use("/", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/view/index.html");
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})