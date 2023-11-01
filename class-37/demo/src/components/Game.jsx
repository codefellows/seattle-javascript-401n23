// import React from 'react'

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import gameSlice from "../store/gameSlice";

const Game = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(gameSlice.actions.shoot({ player: e.target.name }));
  };

  const handleReset = () => {
    dispatch(gameSlice.actions.reset());
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <Card style={{ width: "400px", margin: "auto" }}>
        <CardContent>
          {game.done ? (
            <Button variant="contained" fullWidth onClick={handleReset}>
              Play Again
            </Button>
          ) : (
            <ButtonGroup fullWidth disabled={game.done} variant="contained">
              <Button variant="contained" name="rock" onClick={handleClick}>
                Rock
              </Button>
              <Button variant="contained" name="paper" onClick={handleClick}>
                Paper
              </Button>
              <Button variant="contained" name="scissors" onClick={handleClick}>
                Scissors
              </Button>
            </ButtonGroup>
          )}
          <Typography variant="h5">Player Throw: {game.playerThrow}</Typography>
          <Typography variant="h5">
            Computer Throw: {game.computerThrow}
          </Typography>
          <Typography variant="h5">Rounds: {game.shoots}</Typography>
          <Typography variant="h5">Player Wins: {game.playerWins}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
