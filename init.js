'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const responseTime = require('response-time');
const fs = require('fs');
const http = require("http");
//const https = require('https'); //for https
// const socketio = require('socket.io'); //socket.io

module.exports.init = function init() {

  //app init
  const app = express();

  require.cache.userObject = { app };
  require.cache.userObject.appPath = __dirname;

  //express middlewares
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());
  app.use(responseTime());

  //configuring http or https

  const server = http.createServer(app);

  //const server = https.createServer({
  //   key: fs.readFileSync('config/ssl/private.key'),
  //   cert: fs.readFileSync('config/ssl/certificate.crt'),
  //   ca: fs.readFileSync('config/ssl/ca_bundle.crt')
  // }, app)

  // const io = socketio(server); //socket init

  // require.cache.userObject.io = io;

  const config = require(path.join(__dirname, '/config/index.js'));
  const appRouter = require(path.join(__dirname, '/routes.js'));
  const logger = config.logger.createLogger('init');

  //socket listener
  // io.on('connect', (client) => {
  //   logger.info("Client Connected");
  //   client.emit("response", {
  //     value: "you are connected"
  //   })
  // });

  // Router mounting
  app.use('/', appRouter);

  // Public Folder binding
  app.use(express.static(__dirname + "/public"));

  server.listen(config.app.port)
    .on('error', error => {
      logger.error(error);
    })
    .on('listening', () => {
      logger.info(`Express listening on ${config.app.port}`);
    });

};
