const path = require('path');
const config = require(path.resolve(require.cache.userObject.appPath, 'config/index.js'));
const router = require('express').Router();
const { greetUser, squareNumber } = require('./crud');
const { validateSquareNumber } = require('./validations');
// eslint-disable-next-line no-unused-vars
const logger = config.logger.createLogger('sample/routes');

router.get('/',
  greetUser,
  function (req, res) {
    res.send(res.locals.greetMsg);
  });

router.get('/sqr/:number',
  validateSquareNumber,
  squareNumber,
  function (req, res) {
    res.send(res.locals.result);
  });

module.exports = router;

