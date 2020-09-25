import React from "react";
import constants from "../constants";
import { getGame } from "../api";
import { useSelector, useDispatch, batch } from "react-redux";
import { selectId, setPage, setRound, setQuestion } from "../store/gameSlice";
import { addPlayer } from "../store/playersSlice";
import { slice as questionsSlice } from "../store/questionsSlice";
import { slice as answersSlice } from "../store/answersSlice";
import { slice as votesSlice } from "../store/votesSlice";
import _ from "lodash";

const gameMapping = {
  answers: answersSlice,
  questions: questionsSlice,
  votes: votesSlice,
};

export const useGamePollingInterval = () => {
  const gameId = useSelector(selectId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!gameId) {
      return;
    }
    const pollingInterval = setInterval(async () => {
      const game = await getGame(`${gameId}`);
      console.log(game);
      batch(() => {
        if (game.data.players) {
          _.keys(game.data.players).forEach((playerId) => {
            dispatch(addPlayer(playerId, game.data.players[playerId].score));
          });
        }
        if (game.data.game && game.data.game.round) {
          dispatch(setRound(game.data.game.round));
        }
        if (game.data.game && game.data.game.page) {
          dispatch(setPage(game.data.game.page));
        }
        if (game.data.game && game.data.game.question) {
          dispatch(setQuestion(game.data.game.question));
        }
        _.keys(gameMapping).forEach((gameKey) => {
          if (game.data[gameKey]) {
            dispatch(gameMapping[gameKey].actions.setAll(game.data[gameKey]));
          }
        });
      });
    }, constants.POLLING_INTERVAL);
    console.log(`interval created: ${pollingInterval}`);
    return () => {
      console.log(`interval destroyed: ${pollingInterval}`);
      clearInterval(pollingInterval);
    };
  }, [gameId, dispatch]);

  return null;
};
