var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/v1');
const passport = require("passport");
var cors = require("cors");

var app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization, Content-Type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Disable option for catch the response
    res.setHeader("Cache-Control", "no-cache ,no-store");
    // Pass to next layer of middleware
    next();
  });





// Static file serving for uploads
app.use('/uploads', express.static('E:/zenCertifier/backend/assets'));




// Passport initialization
require('./middleware/passport')(passport);
app.use(passport.initialize());

// Configuration and models
require('./config');
require('./global_function');
model = require('./models');

// Database connection
model.sequelize.sync();
model.sequelize.authenticate().then(() => {
    console.log("connected to postgres database", CONFIG.db_name);
}).catch((err) => {
    console.log("Unable to connect to postgres database", err);
});

// API routes
app.use('/v1', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handling middleware
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
