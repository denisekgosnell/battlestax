import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./Loading.css";

const Loading = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className="loading-root"
    >
      <img className="brand" src={theme.brandImage} alt="BattleStax" />
      <div style={{ width: 64 }}>
        <LinearProgress />
      </div>
    </Grid>
  );
};

export default Loading;
