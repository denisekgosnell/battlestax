import React from "react";
import { actions } from "../../state";
import { createGame } from "../../api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import faker from "faker";

const NewGame = ({ initGame }) => {
  const history = useHistory();

  const createAndInitGame = async () => {
    const newGameId = faker.helpers.replaceSymbols("????");
    await createGame(newGameId);
    initGame(newGameId);
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
};

export default connect(null, {
  initGame: actions.initGame,
})(NewGame);
