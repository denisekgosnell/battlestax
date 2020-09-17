import React from "react";
import constants from "../../constants";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const AddPlayers = ({ gameId, players }) => {
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

export default connect(mapStateToProps)(AddPlayers);
