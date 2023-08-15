// this file is now the brain, instead of just a barrel
// becomes a socket server and handles reciving and routing of messages

const { Server } = require("socket.io");
const { EVENT_NAMES, Queue } = require("./utils");

const io = new Server();

io.listen(3000);

// The Hub is the brain so it will keep track of the queues

const driverQueue = new Queue();
const packageQueue = new Queue();
// if the client sends getAll I will want one argument - their store name
// if they send a store name of flowers I will save their socket as the flowersSocket
let flowersSocket = null;
let acmeSocket = null;
const flowersDeliveredQueue = new Queue();
const acmeWidgetDeliveredQueue = new Queue();

function handlePickup(payload) {
  console.log("HUB package arrived ready for delivery", payload.messageId);
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
  // when you get a delivery payload.company === "flowers" ? flowersDeliveredQueue.enqueue(payload)
  if (payload.clientId === "1-800-flowers") {
    // put it in the 1-800-flowers queue
    flowersDeliveredQueue.enqueue(payload);
    flowersSocket.emit(EVENT_NAMES.delivered, payload);
  }
  if (payload.clientId === "acme-widgets") {
    // put it in acme queue
    acmeWidgetDeliveredQueue.enqueue(payload);
    acmeSocket.emit(EVENT_NAMES.delivered, payload);
  }
}

// handleRecieved
// flowersDeliveredQueue.dequeue()

// handleGetAll(companyName, socket) {
//   // dequeue from that companies delivered queue and send all to
//   socket.emit(EVENT_NAMES.delivered, payload);
// }

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

// function handleRegistration(companyName) {
//   if (!deliveredQueue[companyName]) {
//     deliveredQueue[companyName] = new Queue();
//     // {
//     //   "flowers": [],
//     //   "acme widgets": []
//     // }
//   }
// }

// EXAMPLE PAYLOAD FOR MY REFERENCE
// const payload = {
//   event: "pickup", // either pickup or delivered
//   messageId: event.orderId, // unique id from the original payload
//   clientId: `1-800-flowers`, // either acme-widgets or 1-800-flowers
//   order: event,
// };
function handleReceived(payload) {
  console.log("vendor acknowledged delivery", payload.messageId);
  // remove from the queue
  if (payload.clientId === "1-800-flowers") {
    // put it in the 1-800-flowers queue
    flowersDeliveredQueue.dequeue();
  }
  if (payload.clientId === "acme-widgets") {
    // put it in acme queue
    acmeWidgetDeliveredQueue.dequeue();
  }
}

function handleGetAll(storeName, socket) {
  if (storeName === "1-800-flowers") {
    flowersSocket = socket;
    flowersDeliveredQueue.queue.forEach((order) => {
      socket.emit(EVENT_NAMES.delivered, order);
    });
  } else if (storeName === "acme-widgets") {
    acmeSocket = socket;
    acmeWidgetDeliveredQueue.queue.forEach((order) => {
      socket.emit(EVENT_NAMES.delivered, order);
    });
  }
}

function handleConnection(socket) {
  console.log("have new connection", socket.id);

  // BUSY WORK! Whenever the hub gets a pickup or delivered event, send it to everyone!
  // socket.on("register", handleRegistration);
  // First action from Vendor
  socket.on(EVENT_NAMES.pickup, handlePickup);

  socket.on(EVENT_NAMES.ready, (payload) => {
    handleReady(socket);
  });

  socket.on(EVENT_NAMES.delivered, handleDelivered);
  socket.on("received", handleReceived);
  socket.on("getAll", (storeName) => handleGetAll(storeName, socket));

  // these on functions take two* arguments
  // the event or string we are listening for
  // the callback function that handles the event
  // the callback function AUTOMATICALLY recieves the payload as it's first argument
  // socket.on(EVENT_NAMES.pickup, handlePickup);
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
