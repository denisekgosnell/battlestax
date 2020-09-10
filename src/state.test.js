import reducer, { initialState } from "./state";
import constants from "./constants";

describe("start a new game reducer", () => {
  // TEST: testing the default returns the initialized state
  it("should return the initialized state; testing the default", () => {
    expect(reducer(initialState, {})).toMatchSnapshot();
  });

  // TEST: initialize the app
  it("should return handle the APP INITIALIZED request", () => {
    expect(
      reducer(initialState, {
        type: constants.APP_INITIALIZED,
      })
    ).toMatchSnapshot();
  });

  // TEST: start a new game INIT_GAME
  it("should handle INIT_GAME request", () => {
    expect(
      reducer(initialState, {
        type: constants.INIT_GAME,
        payload: { gameId: 0 },
      })
    ).toMatchSnapshot();
  });

  // TEST: should add 1 player, and that player should be the vip
  it("should handle ADDING_PLAYERS request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADDING_PLAYERS,
        payload: { playerId: 0, name: "DKG" },
      })
    ).toMatchSnapshot();
  });

  // TEST: should start the tutorial
  it("should handle START_TUTORIAL request", () => {
    expect(
      reducer(initialState, {
        type: constants.START_TUTORIAL,
        payload: {
          questions: { 1: { roundId: 0, content: "Does this pass?" } },
        },
      })
    ).toMatchSnapshot();
  });

  // TEST: should start round one
  it("should handle ROUND_ONE request", () => {
    expect(
      reducer(initialState, {
        type: constants.ROUND_ONE,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start round two
  it("should handle ROUND_TWO request", () => {
    expect(
      reducer(initialState, {
        type: constants.ROUND_TWO,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start final round
  it("should handle FINAL_ROUND request", () => {
    expect(
      reducer(initialState, {
        type: constants.FINAL_ROUND,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start final round
  it("should handle END_GAME request", () => {
    expect(
      reducer(initialState, {
        type: constants.END_GAME,
      })
    ).toMatchSnapshot();
  });

  // TEST: should change current state to ANSWER_QUESTIONS
  it("should handle ANSWER_QUESTIONS request", () => {
    expect(
      reducer(initialState, {
        type: constants.ANSWER_QUESTIONS,
      })
    ).toMatchSnapshot();
  });

  // TEST: should add an answer from a player for a question
  it("should handle the ADD_ANSWER request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADD_ANSWER,
        payload: {
          answerId: 0,
          questionId:0,
          playerId: 0,
          content: "test answer"
        }
      })
    ).toMatchSnapshot();
  });

  // TEST: should change current state to PLAYER_VOTING
  it("should handle PLAYER_VOTING request", () => {
    expect(
      reducer(initialState, {
        type: constants.PLAYER_VOTING,
      })
    ).toMatchSnapshot();
  });

  // TEST: should add a vote from a player for an answer
  it("should handle the ADD_PLAYER_VOTE request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADD_PLAYER_VOTE,
        payload: {
          voteId: 0,
          questionId: 0,
          playerId: 0,
        }
      })
    ).toMatchSnapshot();
  });

  // TEST: should add a vote from the audience for an answer
  it("should handle the ADD_AUDIENCE_VOTE request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADD_AUDIENCE_VOTE,
        payload: {
          answerId: 0,
        }
      })
    ).toMatchSnapshot();
  });

  // TEST: should change current state to UPDATE_LEADERBOARD
  it("should handle UPDATE_LEADERBOARD request", () => {
    expect(
      reducer(initialState, {
        type: constants.UPDATE_LEADERBOARD,
      })
    ).toMatchSnapshot();
  });

  // TEST: add to the audience
  it("should handle ADD_AUDIENCE request", () => {
    expect(
      reducer(initialState, {
        type: constants.ROUND_ONE,
      })
    ).toMatchSnapshot();
  });
  
  // TEST: should change current state to UPDATE_SCORES
  // TODO
  it("should handle SET_SCORES request", () => {
    expect(
      reducer(initialState, {
        type: constants.SET_SCORES,
        payload: {
          questionId: 0
        }
      })
    ).toMatchSnapshot();
  });

  // **Integration tests**
  // TEST: Should not start a game with 1 or 2 players
  // TEST 6: should start a game with no more than 8 players
});
