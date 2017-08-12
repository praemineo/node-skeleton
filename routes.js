const path = require('path');
const config = require(path.join(__dirname, '/config/index.js'));
const logger = config.logger.createLogger('routes');
const router = require('express').Router();

const appObject = require.cache.userObject.app;
const errorObject = require.cache.userObject.errorObject;

const printRoute = (req, res, next) => {
  logger.debug(`METHOD: ${req.method} URL: ${req.url}`);
  next();
};

appObject.use('/', router);
appObject.use('/sample', require(path.join(__dirname, '/user_modules/sample/routes.js')));

//not found
appObject.use('/', (req, res, next) => {
  const errObj = errorObject.getError('PAGE_NOT_FOUND');

  res.statusCode = errObj.status;
  res.json(errObj.errorMessage);
});

//error
appObject.use('/', (err, req, res, next) => {
  const errObj = errorObject.getError('SERVER_ERROR');

  res.statusCode = errObj.status;
  res.json(errObj.errorMessage);
  
  logger.error(err);
});

module.exports = router;

