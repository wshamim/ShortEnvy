const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const config = require('config');
const urlRoutes = require('./routes/url');

console.log('DBHost:', config.DBHost);
const mongooseHost = process.env.MONGODB_URI ? process.env.MONGODB_URI : config.DBHost;
const mongooseOptions = {};
if (config.DBAuthUser && config.DBAuthUser !== '' && config.DBAuthPass && config.DBAuthPass !== '') {
  mongooseOptions.auth = {
    user: config.DBAuthUser,
    password: config.DBAuthPass
  };
}
if (process.env.MONGODB_USER && process.env.MONGODB_PASS) {
  mongooseOptions.auth = {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASS
  };
}
mongoose.connect(
  mongooseHost,
  mongooseOptions
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Return the react app after compilation
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Resolve the url to the original url if exists in DB
app.get('/:short_id', urlRoutes.resolveUrl);

// Save/restore the URL from DB and return resultent URL
app.post('/api/shorten', urlRoutes.shortenUrl);

module.exports = app;
