import React from "react";
import Loading from "../Loading";
import constants from "../../constants";
import "./index.css";

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

const App = ({ initialized, currentState }) => {
  // handle app initialization
  if (!initialized) {
    return <Loading />;
  }

  return <div className="App">{stateMapping[currentState.name]}</div>;
};

const mapStateToProps = (state) => ({
  initialized: state.initialized,
  currentState: state.currentState,
});

export default connect(mapStateToProps)(App);
