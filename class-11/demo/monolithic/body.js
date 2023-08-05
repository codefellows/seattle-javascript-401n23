'use strict'

// Require the Events Class from internal Node module
const Events = require('events');

// Initialize an "Event Pool"
const events = new Events();

// Registering an event listener ...
// "Subscribe to the light event"
events.on('light', logIt);

events.on('light', pupil);
events.on('light', squint);
events.on('light', arm);
events.on('light', hair);

function logIt(data) {
  console.log(data);
}

function pupil(payload) {
  console.log("Eyes are dilated at", payload.brightness, "%")
}

function squint(payload) {
  if (payload.brightness > 50) {
    console.log("We are squinting")
  }
}

function arm(payload) {
  if (payload.brightness >= 90) {
    console.log("Covering our eyes");
  }
}

function hair(payload) {
  console.log("Hair is standing up")
}

// Publish or Broadcast the "light" event
setInterval(() => {
  console.log('---------------------------');
  let brightness = Math.ceil(Math.random() * 100);
  events.emit("light", { event: "light", brightness });
}, 2000)

