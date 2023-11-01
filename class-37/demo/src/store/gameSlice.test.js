import gameSlice from "./gameSlice";
import { evaluatePlayerWin } from "./gameSlice";

describe("evaluate player win", () => {
  test("it should return true if the player wins", () => {
    expect(evaluatePlayerWin("rock", "scissors")).toBe(true);
  });
  test("it should return false if the player loses", () => {
    expect(evaluatePlayerWin("scissors", "rock")).toBe(false);
  });
});

describe("game reducers work", () => {
  test("shoot works properly", () => {
    // arrange
    const initialState = {
      playerThrow: undefined,
      computerThrow: undefined,
      shoots: 0,
      playerWins: 0,
      done: false,
    };

    const payload = { player: "rock", computer: "scissors" };
    // act
    const newState = gameSlice.reducer(
      initialState,
      gameSlice.actions.shoot(payload)
    );
    // assert
    // expect to see some state change
    expect(newState.playerThrow).toEqual("rock");
    expect(newState.computerThrow).toEqual("scissors");
    expect(newState.shoots).toEqual(1);
    expect(newState.playerWins).toEqual(1);
  });
});
