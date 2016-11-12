const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');

const config = require(path.join(__dirname, '/config/index.js'));
const appRouter = require(path.join(__dirname, '/routes.js'));

module.exports.init = function init() {

  const app = express();

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(helmet());


  const logger = config.logger.createLogger('init');

  // Router mounting
  app.use('/', appRouter);

  // Public Folder binding
  app.use(express.static(__dirname + "/public"));

  logger.info('App initialized');

  app.listen(config.app.port)
    .on('error', error => {
      logger.error(error);
    })
    .on('listening', () => {
      logger.info(`Express listening on ${config.app.port}`);
    });

};
