var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();

const exphbs = require("express-handlebars");

var app = express();


// Set Handlebars as the templating engine
app.engine("hbs", exphbs.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, etc.)
app.use(express.static("public"));

 // Enable parsing of URL-encoded data
app.use(express.urlencoded({ extended: false }));
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
