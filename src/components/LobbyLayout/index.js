import React from "react";
import constants from "../../constants";
import AddPlayers from "../Screens/AddPlayers";
import { connect } from "react-redux";

const LobbyLayout = ({ currentState }) => {
  switch (currentState.name) {
    case constants.ADDING_PLAYERS:
      return <AddPlayers />;
    default:
      return <AddPlayers />;
  }
};

const mapStateToProps = (state) => ({
  currentState: state.currentState,
});

export default connect(mapStateToProps)(LobbyLayout);
