// make a new instance of a socket server
const { Server } = require("socket.io");
const events = require("./utility.js");

const io = new Server();

io.listen(3000);

// namespace
const caps = io.of("/caps");

// emit === send
// on === listen

function handlePickupReady(payload, socket) {
  console.log("the pickup was requested", payload.orderId);
  // socket only emits back to one socket this is demo only
  socket.emit("received", { message: "pickup acknowledged" });
  // emit to everyone who is prepared to listen
  caps.emit(events.ready, { message: "a pickup is now ready", ...payload });
}

function handleDelivered(payload) {
  console.log(`the package for ${payload.customerId} has been delivered`);
  caps.emit(events.delivered, {
    orderId: payload.orderId,
    message: `the package for ${payload.customerId} has been delivered`,
  });
}

function handlePickedUp(payload) {
  console.log("the driver picked up the package", payload.orderId);
  caps.emit(events.pickedUp, payload);
}

function handleInTransit(payload) {
  console.log("the package is in transit", payload.orderId);
  caps.emit(events.inTransit, payload);
}

function handleConnection(socket) {
  console.log("we have a new connection: ", socket.id);

  // package ready for pickup - driver needs to know - emit to driver ready
  // package picked up by driver - let the vendor know it has been picked up
  // package in transit - let the vendor know
  // package delivered - tell everyone it was delivered
  socket.on(events.pickup, (payload) => handlePickupReady(payload, socket));
  socket.on(events.pickedUp, handlePickedUp);
  socket.on(events.inTransit, handleInTransit);
  socket.on(events.delivered, handleDelivered);
}

function startSocketServer() {
  console.log("The server has been started");
  // connection is kinda a magic word than knows to react or listen to any client connect made. A socket will be passed on connection.
  caps.on("connection", handleConnection);
}

// form.addEventListener("submit", handleSubmit)
module.exports = {
  startSocketServer,
  handleInTransit,
  handleDelivered,
  io,
  caps,
};
