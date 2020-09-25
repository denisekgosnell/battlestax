import React from "react";
import { Divider, Grid, Typography } from "@material-ui/core";

export default function TitleBar({ gameId, player, playerCount }) {
  return (
    <React.Fragment>
      <Grid container style={{ padding: 8 }} alignItems="center">
        <Grid item style={{ flexGrow: 1 }}>
          <Typography className="small-highlight">{gameId}</Typography>
        </Grid>
        <Grid item style={{ flexShrink: 0, marginTop: 4 }}>
          {player && <Typography>{player}</Typography>}
          {playerCount && <Typography>{playerCount} players</Typography>}
        </Grid>
      </Grid>
      <Divider />
      <Typography
        size="small"
        variant="caption"
        color="textSecondary"
        style={{ padding: 8 }}
      >
        BattleStax
      </Typography>
    </React.Fragment>
  );
}
