import React from "react";
import Loading from "../Loading";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import JoinGame from "../PlayerScreens/JoinGame";
import LobbyLayout from "../LobbyLayout";
import PlayerLayout from "../PlayerLayout";
import NewGame from "../LobbyScreens/NewGame";
import { Grid } from "@material-ui/core";

const App = ({ initialized }) => {
  // handle app initialization
  if (!initialized) {
    return <Loading />;
  }

  return (
    <div className="app-root">
      <Grid container direction="column" justify="center" alignItems="center">
        <Switch>
          <Route exact path="/">
            <JoinGame />
          </Route>
          <Route exact path="/player/:gameid">
            <PlayerLayout />
          </Route>
          <Route exact path="/lobby">
            <NewGame />
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

export default connect(mapStateToProps)(App);
