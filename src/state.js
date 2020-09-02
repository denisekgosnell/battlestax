import constants from "./constants";
import _ from "lodash";

const initialState = {
  initialized: false,
  gameId: "",
  currentState: {}, // name, roundId
  players: {}, // plauyerId, name, score; number of players == number of questions
  audienceSize: 0,
  rounds: {}, // roundId, type, title, score multiplier
  questions: {}, // questionId, roundId, content
  answers: {}, // answerId, questionId, playerId, content
  votes: {}, // voteId, answerId, playerId
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
      // start a new game;
      // set the gameID from the action
      // game's current state is "ADDING PLAYERS"
      return {
        ...state,
        gameId: action.payload.gameId,
        currentState: {
          ...state.currentState,
          name: constants.ADDING_PLAYERS,
        },
      };

    case constants.ADDING_PLAYERS:
      // adds a new player to the players list
      if (_.size(state.players.Data) === constants.MAXIMUM_PLAYERS)
        return { ...state, audienceSize: state.audienceSize++ };
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.playerId] : {
            name: action.payload.name,
            vip: !_.size(state.players.Data),
            score: 0,
          },
        },
      };

    case constants.START_TUTORIAL:
      // game's current round is "TUTORIAL ROUND"
      // questions payload is initialized from the action
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.TUTORIAL_ROUND,
        },
        questions: action.payload.questions
      };

    case constants.ROUND_ONE:
      // game's current round should be "ROUND ONE"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.ROUND_ONE
        },
      };

    case constants.ROUND_TWO:
      // game's current round should be "ROUND TWO"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.ROUND_TWO
        },
      };

    case constants.FINAL_ROUND:
      // game's current round should be "FINAL_ROUND"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          roundId: constants.FINAL_ROUND
        },
      };
      
    case constants.ANSWER_QUESTIONS:
        // game's current state should be "ANSWER_QUESTIONS"
        return {
          ...state,
          currentState: {
            ...state.currentState,
            name: constants.ANSWER_QUESTIONS
          },
        };
  
    case constants.PLAYER_VOTING:
      // game's current state should be "PLAYER_VOTING"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.PLAYER_VOTING
        },
      };
    
    case constants.AUDIENCE_VOTING:
      // game's current state should be "AUDIENCE_VOTING"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.AUDIENCE_VOTING
        },
      };
      
    case constants.UPDATE_SCORES:
      // game's current state should be "UPDATE_SCORES"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.UPDATE_SCORES
        },
      };
        
    case constants.UPDATE_LEADERBOARD:
      // game's current state should be "UPDATE_LEADERBOARD"
      return {
        ...state,
        currentState: {
          ...state.currentState,
          name: constants.UPDATE_LEADERBOARD
        },
      };              
    
    case constants.ADD_AUDIENCE:
      // incriments the audience state value
      return {
        ...state,
        audienceSize: state.audienceSize++,
      };

    // case constants.ADDING_ANSWERS:
    //   // Flip the bit of the current round to "ADDING ANSWERS"
    //   return {
    //     ...state,
    //     currentGame: {
    //       ...state.currentGame,
    //       rounds: [
    //         ...state.currentGame.rounds,
    //         // TODO: we are changing the state of the current round to "ADDING ANSWERS"
    //         // how do we flip this for the current round only?
    //       ],
    //     },
    //   };

    // case constants.USER_VOTING:
    //   // insert a player's vote into the state
    //   return {
    //     ...state,
    //     votes: {
    //       ...state.votes,
    //       [action.payload.voteId]: {
    //         questionId: action.payload.questionId,
    //         playerId: action.payload.playerId,
    //       },
    //     },
    //   };
    default:
      return state;
  }
}
