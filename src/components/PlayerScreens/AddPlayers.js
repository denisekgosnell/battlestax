import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";

const AddPlayers = ({ gameId }) => {
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
};

const mapStateToProps = (state) => ({
  gameId: state.gameId,
});

export default connect(mapStateToProps)(AddPlayers);
