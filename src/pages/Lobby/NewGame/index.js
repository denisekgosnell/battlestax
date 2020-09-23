import React from "react";
import { createGame } from "../../../api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generateGameId } from "../../../util/random";
import { Button, Grid, Typography } from "@material-ui/core";
import { initialize } from "../../../store/gameSlice";

export default function NewGame() {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAndInitGame = async () => {
    const newGameId = generateGameId();
    dispatch(initialize(newGameId));
    await createGame(newGameId);
    history.push(`/lobby/${newGameId}`);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" paragraph>
        BattleStax
      </Typography>
      <Button
        disableElevation
        onClick={createAndInitGame}
        size="large"
        variant="contained"
        color="primary"
      >
        start new game
      </Button>
    </Grid>
  );
}
