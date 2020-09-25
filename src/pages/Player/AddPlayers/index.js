import React from "react";
import { Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { updateGame } from "../../../api";
import { selectId } from "../../../store/gameSlice";
import constants from "../../../constants";

export default function AddPlayers() {
  const [startingGame, setStartingGame] = React.useState(false);
  const gameId = useSelector(selectId);
  const startGame = async () => {
    console.log(`${gameId}/game`);
    setStartingGame(true);
    await updateGame(`${gameId}/game`, { page: constants.TUTORIAL_PAGE });
  };

  return (
    <React.Fragment>
      <Typography variant="h4" paragraph>
        BattleStax
      </Typography>

      <Typography color="textSecondary" paragraph>
        Simmer down, we're waiting for more players
      </Typography>

      <Button
        fullWidth
        disableElevation
        disabled={startingGame}
        onClick={startGame}
        size="large"
        variant="contained"
        color="primary"
      >
        start game
      </Button>
    </React.Fragment>
  );
}
