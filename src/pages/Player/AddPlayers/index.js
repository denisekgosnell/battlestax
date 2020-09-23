import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function AddPlayers() {
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
      <Typography color="textSecondary">
        Simmer down, we're waiting for more players
      </Typography>
    </Grid>
  );
}
