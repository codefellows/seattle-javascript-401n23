'use strict';

const events = require('../event-pool.js');

events.on('light', logIt);
events.on('itch', logIt);

function logIt(data) {
  console.log(data);
}
