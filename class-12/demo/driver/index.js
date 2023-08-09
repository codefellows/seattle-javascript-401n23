const { io } = require("socket.io-client");
const events = require("../utility.js");
const { handleReady } = require("./handler.js");

const client = io("ws://localhost:3000/caps");
client.on(events.announcement, (payload) => console.log(payload.message));
client.on(events.ready, handleReady);

module.exports = { client };
