import React, { useEffect, useState } from "react";
import constants from "../../constants";
import { actions } from "../../state";
import { connect } from "react-redux";
import _ from "lodash";
import { getGame } from "../../api";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const AddPlayers = ({ gameId, players, addPlayer }) => {
  let pollingInterval;
  useEffect(() => {
    pollingInterval = setInterval(async () => {
      const game = await getGame(`${gameId}`);
      if (game.data.players) {
        _.keys(game.data.players).forEach((playerId) => {
          addPlayer({
            playerId,
            name: playerId,
          });
        });
      }
    }, 3000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h3">{gameId}</Typography>
      <List>
        {_.map(_.keys(players), (playerId) => (
          <ListItem key={playerId}>
            <ListItemText
              primary={players[playerId].name}
              secondary={players[playerId].vip ? "VIP" : ""}
            />
          </ListItem>
        ))}
      </List>
      {_.keys(players).length < constants.MINIMUM_PLAYERS && (
        <Typography>need moar players y'all!</Typography>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  gameId: state.gameId,
  players: state.players,
});

export default connect(mapStateToProps, { addPlayer: actions.addPlayer })(
  AddPlayers
);