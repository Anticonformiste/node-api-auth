const express = require('express');
// For logging the requests details
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const router = require('./routes/app-routes');

// DB setup
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/marcovdb_new',
  { useNewUrlParser: true }
);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database "marcovdb_new"');
});
// On Error
mongoose.connection.on('error', err => {
  console.log('Database error: ' + err);
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/api', router);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Server up and running, PORT:${port}.`);
