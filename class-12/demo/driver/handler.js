const handleReady = (payload) => {
  console.log("The package is ready to be picked up");
  setTimeout(() => {
    client.emit(events.inTransit, payload);
  }, 2000);
  setTimeout(() => {
    console.log("the package has been delivered");
    client.emit(events.delivered, payload);
  }, 5000);
};

module.exports = { handleReady };
