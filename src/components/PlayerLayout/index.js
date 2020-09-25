import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import { selectPage, selectPlayer, selectId } from "../../store/gameSlice";
import AddPlayers from "../../pages/Player/AddPlayers";
import RoundInput from "../../pages/Player/RoundInput";
import RoundVote from "../../pages/Player/RoundVote";
import { useGamePollingInterval } from "../../util/hooks";
import { Divider, Grid, Typography } from "@material-ui/core";

const getPage = (page) => {
  switch (page) {
    case constants.ADDING_PLAYERS_PAGE:
      return <AddPlayers />;
    case constants.TUTORIAL_PAGE:
      return <React.Fragment />;
    case constants.ROUND_INPUT_PAGE:
      return <RoundInput />;
    case constants.ROUND_VOTE_PAGE:
      return <RoundVote />;
    default:
      return <React.Fragment />;
  }
};

export default function PlayerLayout() {
  const page = useSelector(selectPage);
  const player = useSelector(selectPlayer);
  const gameId = useSelector(selectId);
  useGamePollingInterval();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ width: 320 }}
    >
      <Grid item style={{ height: 50, width: 320 }}>
        <Typography>
          {player}, {gameId}
        </Typography>
        <Divider />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        {getPage(page)}
      </Grid>
    </Grid>
  );
}
