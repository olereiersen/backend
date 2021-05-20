const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');

const tubRoutes = require('./api/routes/tub');
const compression = require('compression');

//mongoose.connect('mongodb://localhost/tub', {useNewUrlParser: true, useUnifiedTopology: true});

// Setup middleware
app.use(morgan('dev')); // Logging
app.use(compression());
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})); // URL body parser
app.use(bodyParser.json({limit: '10mb'})); // URL body parser


// Adjusting the respons header to avoid CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // Handling OPTIONS requests
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which handle requests
app.use('/api/tub', tubRoutes);

// Routing error handling
app.use((req,res,next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Handling all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error)
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;