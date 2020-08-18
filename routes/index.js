// Route handler module
const express = require("express");
const router = express.Router();
const createError = require('http-errors')
const {projects} = require("../data.json");

//Index Page
router.get('/', (req, res) => {
  res.render('index', { projects});
});

//About Page
router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project/:id', (req, res, next) => {
  const project = projects.find(project => project.id === req.params.id);

  if (project===undefined){
    const err =createError("That page doesn't exist")
    next(err)
  } else{
  res.render('project', project);
  }
});

module.exports = router;
