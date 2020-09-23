import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import { selectPage } from "../../store/gameSlice";
import AddPlayers from "../../pages/Player/AddPlayers";

export default function PlayerLayout() {
  const page = useSelector(selectPage);
  switch (page) {
    case constants.ADDING_PLAYERS:
      return <AddPlayers />;
    default:
      return <AddPlayers />;
  }
}
