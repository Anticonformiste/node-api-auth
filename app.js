const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
// For logging the requests details
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const router = require('./routes/app-routes');
const { DB } = require('./configuration');

// DB setup
mongoose.Promise = global.Promise;
mongoose.connect(
  DB.PATH,
  { useNewUrlParser: true }
);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ', DB.name);
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
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'))
};
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server up and running at https://localhost:${port}`);
});

// app.listen(port);
