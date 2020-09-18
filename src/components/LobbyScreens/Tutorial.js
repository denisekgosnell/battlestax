import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

const Tutorial = () => {
  useEffect(() => {
    setTimeout(() => {}, 10000);
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Typography>here's how to play bruh</Typography>
    </Grid>
  );
};

export default Tutorial;
