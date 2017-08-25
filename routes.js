//the base application router.

const path = require('path');
const config = require(path.join(__dirname, '/config/index.js'));
const logger = config.logger.createLogger('routes');
const router = require('express').Router();

//getting the app and error objects from userObject;
const appObject = require.cache.userObject.app;
const errorObject = require.cache.userObject.errorObject;

//prining the details of any requests being made to the application.
const printRoute = (req, res, next) => {
  logger.debug(`METHOD: ${req.method} URL: ${req.url}`);
  next();
};

//attaching other routes to the base router.
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

