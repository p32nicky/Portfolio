const express = require('express');
const app = express();
const createError = require('http-errors')
const { projects } = require("./data.json");

app.set('view engine', 'pug');

app.use("/static", express.static("public"));
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects[projectId];
  res.render("project", { project });
});

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(`${err.status}: ${err.message}`);
  res.render("error", {err});

});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});