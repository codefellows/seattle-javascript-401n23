const { chance, EVENT_NAMES } = require("../utils");

// vendors job is to say they have an order to be picked up.
// we want to generate the order event and send it out
// this should happen at intervals once we start the service
function sendPickup(client) {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    company: "acme-widgets",
  };

  const payload = {
    event: "pickup", // either pickup or delivered
    messageId: event.orderId, // unique id from the original payload
    clientId: `acme-widgets`, // either acme-widgets or 1-800-flowers
    order: event,
  };
  console.log("Vendor asking for pickup!", event);
  client.emit(EVENT_NAMES.pickup, payload);
}

function acknowledgeDelivery(payload, client) {
  console.log("Thank you for the delivery!", payload.messageId);
  client.emit("received", payload);
}

// this function runs indefinitly which prevents the function from returning, esentially holding the program open
function startVendor(client) {
  console.log("Vendor is started");
  client.emit("getAll", "acme-widgets");
  client.on(EVENT_NAMES.delivered, (payload) =>
    acknowledgeDelivery(payload, client)
  );

  function ready() {
    // sends an initial pickup event, then sets a timer for 4-5 seconds and repeats
    sendPickup(client);
    setTimeout(ready, chance.integer({ min: 5000, max: 10000 }));
  }
  // calls itself every 4 - 5 seconds
  ready();
}

module.exports = {
  startVendor,
  toTest: { sendPickup, acknowledgeDelivery },
};
