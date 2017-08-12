'use strict';

const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const logger = config.logger.createLogger('clone/crud');

/////
const coreObject = {};

coreObject.greetUser = (req, res, next) => {
  req.tempData = {
    greetMsg: 'Hello User !'
  };

  next();
};

coreObject.squareNumber = (req, res, next) => {
  req.tempData = {
    result: `Square of ${req.params.number} is ${parseFloat(req.params.number) * parseFloat(req.params.number)}`
  };

  next();
};

/////

module.exports = coreObject;

