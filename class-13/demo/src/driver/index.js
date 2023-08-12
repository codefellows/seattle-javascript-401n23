const { startDriver } = require("./handler");
const { io } = require("socket.io-client");

const events = io("ws://localhost:3000");

startDriver(events);
module.exports = { events };
