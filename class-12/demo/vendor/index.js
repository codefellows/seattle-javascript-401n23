const { io } = require("socket.io-client");
const events = require("../utility.js");

const client = io("ws://localhost:3000/caps");

const payload = {
  customerId: "john smith",
  orderId: 1,
  address: "1125 cherry lane",
};
client.emit(events.pickup, payload);

client.on(events.announcement, (payload) => console.log(payload.message));
client.on(events.pickedUp, (payload) =>
  console.log("the package has been picked up by the driver", payload.orderId)
);
client.on(events.pickedUp, (payload) =>
  console.log("the package is in transit", payload.orderId)
);

client.on(events.delivered, (payload) =>
  console.log(payload.message, payload.orderId)
);

module.exports = { client };
