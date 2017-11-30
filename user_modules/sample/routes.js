'use strict';

const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const logger = config.logger.createLogger('sample/routes');

const router = require('express').Router();

const crudObject = require(path.join(__dirname, 'crud.js'));
const validationObject = require(path.join(__dirname, 'validations.js'));

router.get('/',
  crudObject.greetUser,
  function (req, res, next) {
    res.send(res.locals.greetMsg);
  });

router.get('/sqr/:number',
  validationObject.validateSquareNumber,
  crudObject.squareNumber,
  function (req, res, next) {
    res.send(res.locals.result);
  });

module.exports = router;

