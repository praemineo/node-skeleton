const initServer = (config, app) => {

  const serverObject = {};

  if (config.app.server.protocol == 'https') {
    const https = require('https');
    serverObject.server = https.createServer({
      key: fs.readFileSync('config/ssl/private.key'),
      cert: fs.readFileSync('config/ssl/certificate.crt'),
      ca: fs.readFileSync('config/ssl/ca_bundle.crt')
    }, app);
  } else {
    const http = require('http');
    serverObject.server = http.createServer(app);
  }

  if (config.app.server.socket) {
    const socket = require('socket.io')
    if (config.app.server.socket.port) {
      serverObject.io = socket(config.app.server.socket.port);
    } else {
      serverObject.io = socket(serverObject.server);
    }
  }

  if (config.app.db) {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;

    const auth = config.app.db.username && config.app.db.password ? {
      user: config.app.db.username,
      pass: config.app.db.password,
      auth: {
        authDB: 'admin'
      }
    } : {};
    mongoose.connect(`${config.app.db.host}:${config.app.db.host}/${config.app.db.database}`, auth);
  }

  return serverObject;
};

module.exports = initServer;

