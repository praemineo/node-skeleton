//the base application router.

const path = require('path');
const config = require(path.join(__dirname, '/config/index.js'));
const logger = config.logger.createLogger('routes');
const router = require('express').Router();
const errorObject = require.cache.userObject.errorObject;

//prining the details of any requests being made to the application.
router.use('/', (req, res, next) => {
  logger.debug(`METHOD: ${req.method} URL: ${req.url}`);
  next();
});

//attaching other routes to the base router.
router.use('/sample', require(path.join(__dirname, '/user_modules/sample/routes.js')));

//not found
router.use('/', (req, res) => {
  const errObj = errorObject.getError('PAGE_NOT_FOUND');
  res.statusCode = errObj.status;
  res.json(errObj.errorMessage);
});

//error
router.use('/', (err, req, res) => {
  const errObj = errorObject.getError('SERVER_ERROR');
  res.statusCode = errObj.status;
  res.json(errObj.errorMessage);
  
  logger.error(err);
});

module.exports = router;

