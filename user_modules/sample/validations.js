const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));

// eslint-disable-next-line no-unused-vars
const logger = config.logger.createLogger('sample/validations');


const validateSquareNumber = (req, res, next) => {
  // Existece check 
  if (req.params.number && !isNaN(parseFloat(req.params.number)) && isFinite(req.params.number)) {
    next();
  } else {
    next('Not valid number provided !');
  }
};

module.exports = {validateSquareNumber};

