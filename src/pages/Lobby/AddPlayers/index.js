import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { getGame } from "../../../api";
import { selectPlayers, addPlayer } from "../../../store/playersSlice";
import { selectId, selectAudienceSize } from "../../../store/gameSlice";
import PlayerList from "../../../components/PlayerList";
import { Grid, Typography } from "@material-ui/core";

export default function AddPlayers() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectId);
  const audienceSize = useSelector(selectAudienceSize);

  React.useEffect(() => {
    const pollingInterval = setInterval(async () => {
      const game = await getGame(`${gameId}`);
      if (game.data.players) {
        _.keys(game.data.players).forEach((playerId) => {
          dispatch(addPlayer(playerId));
        });
      }
    }, 2000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [addPlayer, gameId]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography color="textSecondary">welcome to</Typography>
        <Typography variant="h2" style={{ marginBottom: 64 }}>
          BattleStax
        </Typography>
        <Typography color="textSecondary">game code</Typography>
        <Typography variant="h1" className="highlight">
          {gameId}
        </Typography>
      </Grid>
      <PlayerList players={players} audienceSize={audienceSize} />
    </Grid>
  );
}
