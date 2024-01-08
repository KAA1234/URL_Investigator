// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#express_development_environment_overview

//imports the express module using require()
const express = require("express");
//Creates a server called app
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
