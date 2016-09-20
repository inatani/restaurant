'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./app/routes/index');
var logger = require('morgan');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  //set custom header
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//app.all('/api/*', [require('./app/utilities/middleware')]);

app.use('/', routes);

app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({
    'status': 404,
    'message': 'Request not found'
  });
  return;
});

module.exports = app;
