'use strict';

const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');
const path = require('path');
const bunyanSlack = require('bunyan-slack');

const appRootDir = path.dirname(require.main.filename);
const configHelper = require(path.join(__dirname, '/helper'));

if (process.env.NODE_ENV === 'development') {
  //Declaring output mode.
  const formatOut = bunyanFormat({
    outputMode: 'short',
  });

  //creating bunyan logging
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
} else {
  // If no NODE_ENV configured, then it's considered as Production

  //Declaring output mode.
  const formatOut = bunyanFormat({
    outputMode: 'short',
  });

  //creating bunyan logging
  module.exports.createLogger = function createLogger(name) {
    return bunyan.createLogger({
      name,
      serializers: bunyan.stdSerializers,
      streams: [{
        level: 'info',
        path: `${appRootDir}/logs/info.production.log`
      }, {
        level: 'error',
        stream: new bunyanSlack({
          webhook_url: "<webhook_url>",
          channel: "<channel_name>",
          username: "<sender_name>",
        })
      }],
    });
  };
}

