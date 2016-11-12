const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');
const path = require('path');

const appRootDir = path.dirname(require.main.filename);
const configHelper = require(path.join(__dirname, '/helper'));

if (process.env.NODE_ENV === 'development') {
  const formatOut = bunyanFormat({
    outputMode: 'short',
  });

  module.exports.createLogger = function createLogger(name) {
    return bunyan.createLogger({
      name,
      serializers: bunyan.stdSerializers,
      streams: [{
        level: 'debug',
        stream: formatOut,
      }, {
        level: 'error',
        path: `${appRootDir}/logs/error.development.log`,
      }],
    });
  };
} else if (process.env.NODE_ENV === 'test') {
  configHelper.moduleNotConfigured('bunyan');
} else if (process.env.NODE_ENV === 'beta') {
  configHelper.moduleNotConfigured('bunyan');
} else if (process.env.NODE_ENV === 'production') {
  configHelper.moduleNotConfigured('bunyan');
} else if (process.env.NODE_ENV !== undefined) configHelper.moduleNotConfigured('bunyan');
else configHelper.envNotConfigured();
