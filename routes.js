const path = require('path');
const config = require(path.join(__dirname, '/config/index.js'));
const logger = config.logger.createLogger('routes');

const express = require('express');
const router = express.Router();

router.all('*', function(req, res, next) {
    logger.debug(`URL: ${req.url}`);
    next();
  });

module.exports = router;
