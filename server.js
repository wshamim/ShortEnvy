'use strict';

const app = require('./server/app.js'),
  PORT = process.env.PORT || 8443,
  HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`REST API running on ${HOST}:${PORT}!`);
});
