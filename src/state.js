import constants from "./constants";
import _ from "lodash";

const initialState = {
  initialized: false,
  gameId: 0,
  audienceSize: 0,
  currentState: {
    name: "", // loading, adding players, user voting, display votes...
    roundId: 0,
  },
  players: {
    1: {
      name: "",
    },
  },
  rounds: {
    1: {
      type: "",
      title: "Round One",
      roundState: "",
      scoreMultiplier: 1,
    },
  },
  questions: {
    1: {
      roundId: 0,
      content: "",
    },
  },
  answers: {
    1: {
      questionId: 0,
      playerId: 0,
      content: "",
    },
  },
  votes: {
    1: {
      playerId: 0,
      answerId: 0,
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.APP_INITIALIZED:
      // flips the initialized state for the app
      return {
        ...state,
        initialized: !state.initialized,
      };

    case constants.INIT_GAME:
      // start a new game
      // game's current state should be "ADDING PLAYERS"
      return {
        ...state,
        currentGame: {
          currentState: constants.ADDING_PLAYERS,
        },
      };

    case constants.ADD_PLAYER:
      // adds a new player to the players list
      if (state.currentGame.players.length === constants.MAXIMUM_PLAYERS)
        // TODO: ADDING THE PLAYER WHO TRIGGERS THIS LOGIC TO THE AUDIENCE
        return { ...state, audienceSize: state.audienceSize++ };
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          players: [
            ...state.currentGame.players,
            {
              name: action.payload.name,
              vip: !state.currentGame.players.length,
              totalScore: 0,
            },
          ],
        },
      };
    case constants.START_TUTORIAL:
      // flips the initialized state for the game payload
      // game's current state should be "TUTORIAL ROUND"
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentRound: constants.TUTORIAL_ROUND,
        },
      };

    case constants.ROUND_ONE:
      // flips the initialized state for the game payload
      // game's current state should be "TUTORIAL ROUND"
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentRound: constants.ROUND_ONE,
        },
      };

    case constants.ADD_AUDIENCE:
      // incriments the audience state value
      return {
        ...state,
        audienceSize: state.audienceSize++,
      };

    case constants.QUESTION_ROUND:
      // add in a QUESTION round
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          rounds: [
            ...state.currentGame.rounds,
            // TODO: we are adding a new round of type "QUESTION"
            // do I have to populate the full JSON body?
          ],
        },
      };
    case constants.ADDING_ANSWERS:
      // Flip the bit of the current round to "ADDING ANSWERS"
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          rounds: [
            ...state.currentGame.rounds,
            // TODO: we are changing the state of the current round to "ADDING ANSWERS"
            // how do we flip this for the current round only?
          ],
        },
      };

    case constants.USER_VOTING:
      // insert a player's vote into the state
      return {
        ...state,
        votes: {
          ...state.votes,
          [action.payload.voteId]: {
            questionId: action.payload.questionId,
            playerId: action.payload.playerId,
          },
        },
      };
    default:
      return state;
  }
}
