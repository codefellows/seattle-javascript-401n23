'use strict';

// Require the Events Class from internal Node module
const Events = require('events');

// Initialize an "Event Pool"
const events = new Events();

// Export out the "events" instance so all modules can share it
// If 100 files "require" this one, they will ALL
// bet this same "events" instance.
// This is called a "singleton"
// Node is smart enough to know, that it only has to do this once.
module.exports = events;
