import React from "react";
import constants from "../../constants";
import AddPlayers from "../PlayerScreens/AddPlayers";
import { connect } from "react-redux";

// poll for new players
// Api.getGame(`/${gameId}/players`)

const PlayerLayout = ({ currentState }) => {
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

export default connect(mapStateToProps)(PlayerLayout);
