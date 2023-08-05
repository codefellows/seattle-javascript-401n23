'use strict';

const events = require('../event-pool.js');

events.on('light', pupil);
events.on('light', squint);

function pupil(payload) {
  console.log("Eyes are dilated at", payload.brightness, "%")
}

function squint(payload) {
  if (payload.brightness > 50) {
    console.log("We are squinting")
  }
}

// Publish or Broadcast the "light" event

setInterval(() => {
  console.log('---------------------------');
  let brightness = Math.ceil(Math.random() * 100);
  events.emit("light", { event: "light", brightness });
}, 500)

module.exports = { squint }
