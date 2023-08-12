const chance = require("chance")();
// use the chance lib to create unique random orders

const EVENT_NAMES = {
  pickup: "pickup",
  delivered: "delivered",
  ready: "ready",
};

class Queue {
  constructor() {
    this.queue = [];
  }
  // the driver queue will hold driver sockets
  // the package queue will hold payloads
  enqueue(item) {
    this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = { chance, EVENT_NAMES, Queue };

// remove the 'events' lib
