const { EVENT_NAMES } = require("../utils");
const {
  toTest: { deliver, handlePickup },
} = require("./handler.js");

// this test does not match the demo code, it is from my caps project, but you can use it as a reference

jest.useFakeTimers();

describe("Tests the driver handler functions", () => {
  test("Driver deliver", () => {
    // Arrange
    const io = { emit: jest.fn() };

    // Act
    deliver("1234", io);

    // Assert
    expect(io.emit).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
  });

  test("Driver handlePickup", () => {
    // Arrange
    const io = { emit: jest.fn() };

    // Act
    handlePickup(
      {
        store: "test",
        orderId: "1234",
        customer: "customer",
        address: "111 Main",
      },
      io
    );

    // Timers - skip setTimeout
    jest.runAllTimers();

    // Assert
    expect(io.emit).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
  });
});
