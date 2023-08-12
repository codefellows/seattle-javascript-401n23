const { chance, EVENT_NAMES } = require("../utils");

function deliver(orderId, io) {
  console.log("Driver finished delivery", orderId);
  io.emit(EVENT_NAMES.delivered, orderId);
  io.emit(EVENT_NAMES.ready);
}

function handlePickup(payload, io) {
  // this function logs that it has picked up the delivery, then sets a timer for 2-5 seconds
  // then the time is up it emits that delivery was made
  console.log("Driver received a pickup event!", payload.orderId);
  setTimeout(
    () => deliver(payload.orderId, io),
    chance.integer({ min: 5000, max: 10000 })
  );
}

function startDriver(io) {
  console.log("Driver is started");
  io.emit(EVENT_NAMES.ready);
  io.on(EVENT_NAMES.pickup, (payload) => handlePickup(payload, io));
}

module.exports = { startDriver, toTest: { deliver, handlePickup } };
