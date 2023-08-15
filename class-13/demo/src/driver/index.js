const { startDriver } = require("./handler");
const { io } = require("socket.io-client");

const client = io("ws://localhost:3000");

startDriver(client);
