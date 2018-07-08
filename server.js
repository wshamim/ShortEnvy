'use strict';

const app = require('./server/app.js'),
  PORT = process.env.PORT || 8000,
  HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`REST API running on ${HOST}:${PORT}!`);
});
