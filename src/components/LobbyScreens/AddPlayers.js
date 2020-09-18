import React from "react";
import constants from "../../constants";
import { actions } from "../../state";
import { connect } from "react-redux";
import _ from "lodash";
import { getGame } from "../../api";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";

const AddPlayers = ({ gameId, players, addPlayer, audienceSize }) => {
  const defaultPlayerList = new Array(constants.MAXIMUM_PLAYERS).fill(null);
  const [playerList, setPlayerList] = React.useState(defaultPlayerList);

  const parsePlayers = () => {
    const newPlayerList = playerList.map((player, index) => {
      const playerKeys = _.keys(players);
      if (index < playerKeys.length) {
        return players[playerKeys[index]];
      }
      return null;
    });
    setPlayerList(newPlayerList);
  };

  React.useEffect(() => {
    const pollingInterval = setInterval(async () => {
      const game = await getGame(`${gameId}`);
      if (game.data.players) {
        _.keys(game.data.players).forEach((playerId) => {
          addPlayer({
            playerId,
            name: playerId,
          });
        });
      }
    }, 2000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [addPlayer, gameId]);

  React.useEffect(parsePlayers, [players]);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Typography color="textSecondary">welcome to</Typography>
        <Typography variant="h2" style={{ marginBottom: 64 }}>
          BattleStax
        </Typography>
        <Typography color="textSecondary">game code</Typography>
        <Typography variant="h1" className="highlight">
          {gameId || "WEWS"}
        </Typography>
      </Grid>
      <Grid style={{ width: 320, marginLeft: 124 }}>
        <Typography color="textSecondary">players</Typography>
        <Paper style={{ marginBottom: 16 }} square elevation={0}>
          <List>
            {_.map(playerList, (player, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      player ? (
                        player.name
                      ) : (
                        <Typography color="textSecondary">...</Typography>
                      )
                    }
                  />
                  {player && player.vip && (
                    <ListItemSecondaryAction>
                      <Typography className="vip">VIP</Typography>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                {index < constants.MAXIMUM_PLAYERS - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
        {audienceSize !== 0 && (
          <Typography color="textSecondary">{audienceSize} members</Typography>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  gameId: state.gameId,
  players: state.players,
  audienceSize: state.audienceSize,
});

export default connect(mapStateToProps, { addPlayer: actions.addPlayer })(
  AddPlayers
);
