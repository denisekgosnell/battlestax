import React from "react";
import constants from "../../constants";
import _ from "lodash";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";

export default function PlayerList({ players, audienceSize, showScore }) {
  let playerList = [];
  if (showScore) {
    playerList = _.orderBy(playerList, ["score"], ["desc"]);
  }
  const playerKeys = _.keys(players);
  for (let i = 0; i < constants.MAXIMUM_PLAYERS; i++) {
    const toPush = i < playerKeys.length ? players[playerKeys[i]] : null;
    playerList.push(toPush);
  }

  return (
    <Grid style={{ width: 320, marginLeft: 124 }}>
      <Typography color="textSecondary">players</Typography>
      <Paper style={{ marginBottom: 16 }} square elevation={0}>
        <List>
          {_.map(playerList, (player, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={
                    player ? (
                      player.name
                    ) : (
                      <Typography color="textSecondary">...</Typography>
                    )
                  }
                  secondary={showScore && player && player.score}
                />
                {player && player.vip && (
                  <ListItemSecondaryAction>
                    <Typography className="vip">VIP</Typography>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {index < constants.MAXIMUM_PLAYERS - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {audienceSize !== 0 && (
        <Typography color="textSecondary">{audienceSize} members</Typography>
      )}
    </Grid>
  );
}
