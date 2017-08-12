'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const responseTime = require('response-time');
const initServer = require('./initServer');

module.exports.init = function init() {

const app = express();
require.cache.userObject = {
  app
};
require.cache.userObject.appPath = __dirname;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(responseTime());

const config = require(path.join(__dirname, '/config/index.js'));

const errorObject = require(path.join(__dirname, '/config/error.js'));
require.cache.userObject.errorObject = errorObject;

const appRouter = require(path.join(__dirname, '/routes.js'));
const logger = config.logger.createLogger('init');

// Router mounting
app.use('/', appRouter);

const serverObject = initServer(config, app);

require.cache.userObject.io = serverObject.io;

//server object
serverObject.server.listen(config.app.server.port)
  .on('error', error => {
    logger.error(error);
  })
  .on('listening', () => {
    logger.info(`Express listening on ${config.app.server.port}`);
  });

process.on('uncaughtException', (err) => {
  console.error('whoops! there was an error', errorObject.getError('UNCAUGHT_EXCEPTION', err));
  process.exit(0);
});

};

