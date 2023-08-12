const { chance, EVENT_NAMES } = require("../utils");

// vendors job is to say they have an order to be picked up.
// we want to generate the order event and send it out
// this should happen at intervals once we start the service
function sendPickup(events) {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event);
  events.emit(EVENT_NAMES.pickup, event);
}

function acknowledgeDelivery(orderId) {
  console.log("Thank you for the delivery!", orderId);
}

// this function runs indefinitly which prevents the function from returning, esentially holding the program open
function startVendor(events) {
  console.log("Vendor is started");
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);

  function ready() {
    // sends an initial pickup event, then sets a timer for 4-5 seconds and repeats
    sendPickup(events);
    setTimeout(ready, chance.integer({ min: 5000, max: 10000 }));
  }
  // calls itself every 4 - 5 seconds
  ready();
}

module.exports = {
  startVendor,
  toTest: { sendPickup, acknowledgeDelivery },
};
