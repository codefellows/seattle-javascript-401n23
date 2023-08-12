const {
  startEventServer,
  io,
  handlePickup,
  handleDelivered,
  // handleConnection,
} = require("./hub");
const { EVENT_NAMES } = require("./utils");

describe("tests the hub functionality", () => {
  // when I call the function to start the server, I EXPECT the server to start and a console.log of "Everything is started!" to appear in my terminal
  test("starts the socket server and logs connected", () => {
    const mockLog = jest.spyOn(console, "log");
    startEventServer();
    expect(mockLog).toHaveBeenCalledWith("Everything is started!");
  });
  test("handlePickup recieves an order and emits pickup", () => {
    const payload = { orderId: "1234", name: "Sara" };
    const mockEmit = jest.spyOn(io, "emit");
    handlePickup(payload);
    expect(mockEmit).toHaveBeenCalledWith(
      EVENT_NAMES.pickup,
      expect.objectContaining({ name: "Sara", orderId: "1234" })
    );
  });
  test("handleDelivered recieves an orderId and emits delivered", () => {
    const payload = "1234";
    const mockEmit2 = jest.spyOn(io, "emit");
    handleDelivered(payload);
    expect(mockEmit2).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
  });
  io.close();
});
