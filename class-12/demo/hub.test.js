// we CAN test console.logs
// we CAN test that an emit function was called
const {
  startSocketServer,
  handleInTransit,
  handleDelivered,
  io,
  caps,
} = require("./hub.js");
const events = require("./utility.js");

describe("test the hub functionality", () => {
  test("starts the socket server and logs that it connected", () => {
    const mockLog = jest.spyOn(console, "log");
    startSocketServer();
    expect(mockLog).toHaveBeenCalledWith("The server has been started");
  });
  test("handleInTransit takes a payload and emits the payload", () => {
    const payload = {
      orderId: 1,
    };
    const mockEmit = jest.spyOn(caps, "emit");
    const mockLog = jest.spyOn(console, "log");
    handleInTransit(payload);
    expect(mockLog).toHaveBeenCalledWith(
      "the package is in transit",
      payload.orderId
    );
    // expect(mockEmit).toHaveBeenCalledWith(events.inTransit, payload);
    expect(mockEmit).toHaveBeenCalledWith(
      events.inTransit,
      expect.objectContaining({ orderId: 1 })
    );
  });
  test("handle delivered takes in a payload, logs the payload and emits delivered", () => {
    const payload = {
      orderId: 5,
      customerId: 7,
    };
    const mockEmit = jest.spyOn(caps, "emit");
    const mockLog = jest.spyOn(console, "log");
    handleDelivered(payload);
    expect(mockLog).toHaveBeenCalledWith(
      `the package for ${payload.customerId} has been delivered`
    );
    expect(mockEmit).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(events.delivered, {
      orderId: payload.orderId,
      message: `the package for ${payload.customerId} has been delivered`,
    });
  });
  io.close();
});
