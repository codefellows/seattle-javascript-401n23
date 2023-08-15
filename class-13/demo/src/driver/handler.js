const { chance, EVENT_NAMES } = require("../utils");

function deliver(payload, client) {
  console.log("Driver finished delivery", payload.messageId);
  client.emit(EVENT_NAMES.delivered, payload);
  client.emit(EVENT_NAMES.ready);
}

function handlePickup(payload, client) {
  // this function logs that it has picked up the delivery, then sets a timer for 2-5 seconds
  // then the time is up it emits that delivery was made
  console.log("Driver received a pickup event!", payload.messageId);
  setTimeout(
    () => deliver(payload, client),
    chance.integer({ min: 10000, max: 20000 })
  );
}

function startDriver(client) {
  console.log("Driver is started");
  client.emit(EVENT_NAMES.ready);
  client.on(EVENT_NAMES.pickup, (payload) => {
    handlePickup(payload, client);
  });
  //nope
  // client.on(EVENT_NAMES.pickup, handlePickup(payload, client));
}

module.exports = { startDriver, toTest: { deliver, handlePickup } };
