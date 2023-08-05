'use strict';

const events = require('../event-pool.js');

events.on('light', gooseBumps);

function gooseBumps() {
  console.log("Hair is standing up")
}
