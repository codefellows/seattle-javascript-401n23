// this file is now the brain, instead of just a barrel
// becomes a socket server and handles reciving and routing of messages

const { Server } = require("socket.io");
const { EVENT_NAMES, Queue } = require("./utils");

const io = new Server();

io.listen(3000);

// The Hub is the brain so it will keep track of the queues

const driverQueue = new Queue();
const packageQueue = new Queue();

function handlePickup(payload) {
  console.log("HUB package arrived ready for delivery", payload.orderId);
  // Refactor
  //   when a package comes in check driver queue
  if (driverQueue.isEmpty()) {
    // if no drivers, enqueue to package queue
    packageQueue.enqueue(payload);
  } else {
    // if there is a driver dequeue the driver and send package
    const driverSocket = driverQueue.dequeue();
    driverSocket.emit(EVENT_NAMES.pickup, payload);
  }
  // if no drivers, enqueue to package queue
  // if there is a driver dequeue the driver and send package
}

function handleDelivered(payload) {
  console.log("HUB delivered", payload);
  io.emit(EVENT_NAMES.delivered, payload);
}

function handleReady(socket) {
  // this is the driver emiting that they are ready
  console.log("driver # ", socket.id, "is ready");
  if (packageQueue.isEmpty()) {
    // if there isn’t a package the go in a queue of drivers
    driverQueue.enqueue(socket);
  } else {
    // if there is a package driver delivers it
    // dequeue the package, and emit for THAT SPECIFIC driver USING THEIR SOCKET to pick it up
    const parcel = packageQueue.dequeue();
    socket.emit(EVENT_NAMES.pickup, parcel);
  }
  //   if the driver is ready
  // check the package queue
  // if there is a package driver delivers it
  // if there isn’t a package the go in a queue of drivers
}

function handleConnection(socket) {
  console.log("have new connection", socket.id);

  // BUSY WORK! Whenever the hub gets a pickup or delivered event, send it to everyone!
  socket.on(EVENT_NAMES.delivered, handleDelivered);

  // these on functions take two* arguments
  // the event or string we are listening for
  // the callback function that handles the event
  // the callback function AUTOMATICALLY recieves the payload as it's first argument
  socket.on(EVENT_NAMES.pickup, handlePickup);

  socket.on(EVENT_NAMES.ready, (payload) => {
    handleReady(socket);
  });
}

function startEventServer() {
  // on connection has a payload of the socket that connected
  io.on("connection", handleConnection);
  console.log("Everything is started!");
}

module.exports = {
  startEventServer,
  io,
  handlePickup,
  handleDelivered,
  handleConnection,
};
