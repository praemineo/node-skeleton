'use strict';

const path = require('path');
const config = require(path.join(__dirname, '/config/index.js'));
const logger = config.logger.createLogger('routes');
const router = require('express').Router();

const appObject = require.cache.userObject.app;

router.all('*', function (req, res, next) {
  logger.debug(`URL: ${req.url}`);

  // Variables for communication between middlewears
  req.tempData = {};
  
  next();
});

appObject.use('/', router);
appObject.use('/sample', require(path.join(__dirname, '/user_modules/sample/routes.js')));

module.exports = router;

