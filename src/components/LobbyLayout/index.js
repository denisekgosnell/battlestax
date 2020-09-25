import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import AddPlayers from "../../pages/Lobby/AddPlayers";
import Tutorial from "../../pages/Lobby/Tutorial";
import RoundInput from "../../pages/Lobby/RoundInput";
import RoundVote from "../../pages/Lobby/RoundVote";
import RoundScore from "../../pages/Lobby/RoundScore";
import { selectPage } from "../../store/gameSlice";
import { useGamePollingInterval } from "../../util/hooks";

const getPage = (page) => {
  switch (page) {
    case constants.ADDING_PLAYERS_PAGE:
      return <AddPlayers />;
    case constants.TUTORIAL_PAGE:
      return <Tutorial />;
    case constants.ROUND_INPUT_PAGE:
      return <RoundInput />;
    case constants.ROUND_VOTE_PAGE:
      return <RoundVote />;
    case constants.ROUND_SCORE_PAGE:
      return <RoundScore />;
    default:
      return <AddPlayers />;
  }
};

export default function LobbyLayout() {
  const page = useSelector(selectPage);
  useGamePollingInterval();

  return <div>{getPage(page)}</div>;
}
