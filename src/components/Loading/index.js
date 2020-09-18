import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Loading.css";

const Loading = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className="loading-root"
    >
      <div style={{ width: 64 }}>
        <LinearProgress />
      </div>
    </Grid>
  );
};

export default Loading;
