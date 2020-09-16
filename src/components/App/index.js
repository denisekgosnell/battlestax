import React from "react";
import { actions } from "../../state";
import { createGame } from "../../api";
import Loading from "../Loading";
import { Switch, Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PlayerLayout from "../PlayerLayout";
import LobbyLayout from "../LobbyLayout";
import { Button, TextField, Grid } from "@material-ui/core";
import faker from "faker";
import "./index.css";

const App = ({ initialized, startGame }) => {
  const history = useHistory();
  // handle app initialization
  if (!initialized) {
    return <Loading />;
  }

  const createAndStartGame = async () => {
    const gameId = faker.helpers.replaceSymbols("????");
    await createGame(gameId);
    startGame(gameId);
    history.push(`/lobby/${gameId}`);
  };

  const joinGame = () => {};

  return (
    <div className="app-root">
      <Grid container direction="column" justify="center" alignItems="center">
        <Switch>
          <Route exact path="/">
            <TextField label="Name" variant="outlined" />
            <TextField label="Game ID" variant="outlined" />
            <Button onClick={joinGame} variant="outlined">
              join game
            </Button>
            <Button onClick={createAndStartGame} variant="outlined">
              start new game
            </Button>
          </Route>
          <Route exact path="/game/:gameid">
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
});

export default connect(mapStateToProps, { startGame: actions.startGame })(App);
