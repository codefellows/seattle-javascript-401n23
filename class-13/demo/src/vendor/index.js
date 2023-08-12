const { io } = require("socket.io-client");

const events = io("ws://localhost:3000");
const { startVendor } = require("./handler");

module.exports = { events };
startVendor(events);
