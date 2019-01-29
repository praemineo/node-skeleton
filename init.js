const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const responseTime = require('response-time');
//server initialization function from ./initServer.js
const initServer = require(path.join(__dirname, 'initServer'));

module.exports.init = async function init() {

  //init express
  const app = express();

  //the custom userObject, that is shared over the application via the require cache.
  require.cache.userObject = {
    app 
  };

  //the base __dirname
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

  //initializing config and getting the config object
  const config = require(path.join(__dirname, '/config/index.js'));

  //initializing errorObject
  const errorObject = require(path.join(__dirname, '/config/error.js'));
  require.cache.userObject.errorObject = errorObject;

  //loading the base application router.
  const appRouter = require(path.join(__dirname, '/routes.js'));

  //initialzing the router with the module name.
  const logger = config.logger.createLogger('init');

  // Router mounting
  app.use('/', appRouter);

  //initizing the server, with config and app.
  const { io, server } = await initServer(config, app);

  //passing the socketObject to the userObject
  require.cache.userObject.io = io;

  //server object
  server.listen(config.app.server.port)
    .on('error', error => logger.error(error))
    .on('listening', () => logger.info(`Express listening on ${config.app.server.port}`));

  //catching uncaught excpetions and terminating the application.
  process.on('uncaughtException', (err) => {
    console.error('whoops! there was an error', errorObject.getError('UNCAUGHT_EXCEPTION', err));
    process.exit(0);
  });

};

