const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
// eslint-disable-next-line no-unused-vars
const logger = config.logger.createLogger('clone/crud');

const greetUser = (req, res, next) => {
  res.locals.greetMsg = 'Hello User, Welcome to Node Skeleton';
  next();
};

const squareNumber = (req, res, next) => {
  res.locals.result = `Square of ${req.params.number} is ${parseFloat(req.params.number) * parseFloat(req.params.number)}`;
  next();
};

module.exports = {greetUser, squareNumber};

