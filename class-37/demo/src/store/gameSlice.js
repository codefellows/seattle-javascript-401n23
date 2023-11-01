import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "rock-paper-scissors",
  initialState: {
    playerThrow: undefined,
    computerThrow: undefined,
    shoots: 0,
    playerWins: 0,
    done: false,
  },
  reducers: {
    shoot: (state, action) => {
      const player = action.payload.player;
      const computer = action.payload.computer || generateThrow();
      state.playerThrow = player;
      state.computerThrow = computer;

      if (player !== computer) {
        // update shots and player wins
        if (state.shoots === 2) state.done = true;
        state.shoots += 1;
        // determine winner / did player win
        const playerWon = evaluatePlayerWin(player, computer);
        if (playerWon) state.playerWins += 1;
      }
    },
    reset: (state, _) => {
      state.playerThrow = undefined;
      state.computerThrow = undefined;
      state.shoots = 0;
      state.playerWins = 0;
      state.done = false;
    },
  },
});

const generateThrow = () => {
  const options = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * 3);
  return options[index];
};

export const evaluatePlayerWin = (player, computer) => {
  const winConditions = {
    rock: "paper",
    scissors: "rock",
    paper: "scissors",
  };

  return winConditions[computer] === player;
};

export default gameSlice;
