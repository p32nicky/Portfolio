const express = require('express');
const app = express();
const createError = require('http-errors')
const indexRoute = require("./routes/index")


app.set('view engine', 'pug');

app.use("/static", express.static("public"));
app.use(indexRoute);


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
