const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const logger = config.logger.createLogger('clone/crud');

const greetUser = (req, res, next) => {
  try {
    res.locals.greetMsg = 'Hello User, Welcome to Node Skeleton';
    next();
  } catch (error) {
    logger.error(error);
    next(error); 
  }
};

const squareNumber = (req, res, next) => {
  try {
    res.locals.result = `Square of ${req.params.number} is ${parseFloat(req.params.number) * parseFloat(req.params.number)}`;  
    next();
  } catch (error) {
    logger.error(error);
    next(error); 
  }
  
};

module.exports = {greetUser, squareNumber};

