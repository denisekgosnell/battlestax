import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import AddPlayers from "../../pages/Lobby/AddPlayers";
import { selectPage } from "../../store/gameSlice";

export default function LobbyLayout() {
  const page = useSelector(selectPage);
  switch (page) {
    case constants.ADDING_PLAYERS:
      return <AddPlayers />;
    default:
      return <AddPlayers />;
  }
}
