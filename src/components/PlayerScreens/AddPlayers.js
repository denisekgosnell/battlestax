import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";

const AddPlayers = ({ gameId }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h3">welcome to {gameId}, friend!</Typography>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  gameId: state.gameId,
});

export default connect(mapStateToProps)(AddPlayers);
