import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { updateGame } from "../../../api";
import { selectId, selectPlayer } from "../../../store/gameSlice";
import constants from "../../../constants";

export default function AddPlayers() {
  const [startingGame, setStartingGame] = React.useState(false);
  const gameId = useSelector(selectId);
  const player = useSelector(selectPlayer);
  const startGame = async () => {
    console.log(`${gameId}/game`);
    setStartingGame(true);
    await updateGame(`${gameId}/game`, { page: constants.TUTORIAL_PAGE });
  };

  return (
    <React.Fragment>
      {player === "CRW" && (
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
      )}
    </React.Fragment>
  );
}
