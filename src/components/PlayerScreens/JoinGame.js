import React, { useState } from "react";
import { actions } from "../../state";
import { addPlayer } from "../../api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button, TextField, Grid, Typography } from "@material-ui/core";

const JoinGame = ({ currentPlayerId, setCurrentPlayer, gameId }) => {
  const history = useHistory();
  const [playerId, setPlayerId] = useState(currentPlayerId);
  const [currentGameId, setCurrentGameId] = useState(gameId);

  const joinGame = async (e) => {
    const currentGameIdUpper = currentGameId.toUpperCase();
    await addPlayer(currentGameIdUpper, playerId);
    setCurrentPlayer(playerId);
    history.push(`/player/${currentGameIdUpper}`);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ width: 320 }}
    >
      <Typography variant="h4" paragraph>
        BattleStax
      </Typography>
      <TextField
        style={{ marginBottom: 16 }}
        label="name"
        variant="outlined"
        onChange={(e) => setPlayerId(e.target.value)}
        value={playerId}
      />
      <TextField
        style={{ marginBottom: 16 }}
        inputProps={{ style: { textTransform: "uppercase" } }}
        label="game code"
        variant="outlined"
        value={currentGameId}
        onChange={(e) => setCurrentGameId(e.target.value)}
      />
      <Button
        fullWidth
        disableElevation
        onClick={joinGame}
        size="large"
        variant="contained"
        color="primary"
      >
        join game
      </Button>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  currentPlayerId: state.currentPlayerId,
  gameId: state.gameId,
});

export default connect(mapStateToProps, {
  setCurrentPlayer: actions.setCurrentPlayer,
})(JoinGame);
