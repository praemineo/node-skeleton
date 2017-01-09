'use strict';

module.exports = {
  moduleNotConfigured(moduleName) {
    console.warn(`${moduleName} is not configured to use in ${process.env.NODE_ENV} environment`);
    process.exit();
  },
  envNotSupported() {
    console.warn(`Application is not configured to work with ${process.env.NODE_ENV} node environment`);
    process.exit();
  },
  envNotConfigured() {
    console.warn('Node environment is not configured');
    console.info('You can configure node environment by running "export NODE_ENV=environment" from command line');
    process.exit();
  },
};
