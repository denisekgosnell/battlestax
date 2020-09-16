import React from "react";
import Loading from "../Loading";
import constants from "../../constants";
import { connect } from "react-redux";

const stateMapping = (currentState) => {
  switch (currentState.name) {
    case constants.ADDING_PLAYERS:
      return <Loading />;
    case constants.TUTORIAL_ROUND:
      return <Loading />;
    default:
      return <Loading />;
  }
};

const PlayerLayout = ({ currentState }) => {
  return <div>{stateMapping[currentState.name]}</div>;
};

const mapStateToProps = (state) => ({
  currentState: state.currentState,
});

export default connect(mapStateToProps)(PlayerLayout);
