'use strict';

const events = require('../event-pool.js');

events.on('light', coverEyes);
events.on('itch', scratch);

function scratch(payload) {
  console.log('Scratching itch at', payload.location);
}

function coverEyes(payload) {
  if (payload.brightness >= 90) {
    console.log("Covering our eyes");
  }
}
