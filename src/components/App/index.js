import React, { useState } from "react";
import { actions } from "../../state";
import { createGame, addPlayer } from "../../api";
import Loading from "../Loading";
import { Switch, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PlayerLayout from "../PlayerLayout";
import LobbyLayout from "../LobbyLayout";
import { Button, TextField, Grid } from "@material-ui/core";
import faker from "faker";
import "./index.css";

const App = ({
  initialized,
  initGame,
  currentPlayerId,
  setCurrentPlayer,
  gameId,
}) => {
  const history = useHistory();
  const [playerId, setPlayerId] = useState(currentPlayerId);
  const [currentGameId, setCurrentGameId] = useState(gameId);
  // handle app initialization
  if (!initialized) {
    return <Loading />;
  }

  const createAndInitGame = async () => {
    const newGameId = faker.helpers.replaceSymbols("????");
    await createGame(newGameId);
    initGame(newGameId);
    history.push(`/lobby/${newGameId}`);
  };

  const joinGame = async () => {
    await addPlayer(currentGameId, playerId);
    setCurrentPlayer(playerId);
    history.push(`/player/${currentGameId}`);
  };

  return (
    <div className="app-root">
      <Grid container direction="column" justify="center" alignItems="center">
        <Switch>
          <Route exact path="/">
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setPlayerId(e.target.value)}
              value={playerId}
            />
            <TextField
              label="Game ID"
              variant="outlined"
              value={currentGameId}
              onChange={(e) => setCurrentGameId(e.target.value)}
            />
            <Button onClick={joinGame} variant="outlined">
              join game
            </Button>
            <Button onClick={createAndInitGame} variant="outlined">
              start new game
            </Button>
          </Route>
          <Route exact path="/player/:gameid">
            <PlayerLayout />
          </Route>
          <Route exact path="/lobby/:gameId">
            <LobbyLayout />
          </Route>
        </Switch>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialized: state.initialized,
  currentPlayerId: state.currentPlayerId,
  gameId: state.gameId,
});

export default connect(mapStateToProps, {
  initGame: actions.initGame,
  setCurrentPlayer: actions.setCurrentPlayer,
})(App);
