'use strict';

const path = require('path');

//requiring and initializing the init.
const {init} = require(path.join(__dirname, '/init.js'));

void async function() {
  await init();
}();
