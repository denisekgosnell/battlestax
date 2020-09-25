import React from "react";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../../store/playersSlice";
import PlayerList from "../../../components/PlayerList";
import { Grid, Typography, Button } from "@material-ui/core";
import { selectId, selectAudienceSize } from "../../../store/gameSlice";

export default function Final() {
  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectId);
  const audienceSize = useSelector(selectAudienceSize);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography paragraph>thanks for playing!</Typography>
        <Button variant="contained" color="primary">
          start a new game
        </Button>
      </Grid>
      <PlayerList
        players={players}
        audienceSize={audienceSize}
        showScore={true}
      />
    </Grid>
  );
}
