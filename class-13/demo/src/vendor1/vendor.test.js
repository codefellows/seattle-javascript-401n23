const { EVENT_NAMES } = require("../utils");
const {
  toTest: { sendPickup, acknowledgeDelivery },
} = require("./handler.js");

describe("tests the vendor functions", () => {
  test("sendPickup should emit an order", () => {
    //arrange
    const io = { emit: jest.fn() };

    //act
    sendPickup(io);

    //assert
    expect(io.emit).toHaveBeenCalledWith(
      EVENT_NAMES.pickup,
      expect.any(Object)
    );
  }),
    test("acknowledgeDelivery should say thank you and have the order number", () => {
      //arrange
      const logMock = jest.spyOn(console, "log");

      //act
      acknowledgeDelivery("1234");

      //assert
      expect(logMock).toHaveBeenCalledWith(
        "Thank you for the delivery!",
        "1234"
      );
    });
});
