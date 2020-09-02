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
      })
    ).toMatchSnapshot();
  });

  // TEST: should add 1 player, and that player should be the vip
  it("should handle ADDING_PLAYERS request", () => {
    expect(
      reducer(initialState, {
        type: constants.ADDING_PLAYERS,
      })
    ).toMatchSnapshot();
  });

  // TEST: should start the tutorial
  it("should handle START_TUTORIAL request", () => {
    expect(
      reducer(initialState, {
        type: constants.START_TUTORIAL,
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

  // TEST: should change current state to ANSWER_QUESTIONS
  it("should handle ANSWER_QUESTIONS request", () => {
    expect(
      reducer(initialState, {
        type: constants.ANSWER_QUESTIONS,
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

  // TEST: should change current state to AUDIENCE_VOTING
  it("should handle AUDIENCE_VOTING request", () => {
    expect(
      reducer(initialState, {
        type: constants.AUDIENCE_VOTING,
      })
    ).toMatchSnapshot();
  });

  // TEST: should change current state to UPDATE_SCORES
  it("should handle UPDATE_SCORES request", () => {
    expect(
      reducer(initialState, {
        type: constants.UPDATE_SCORES,
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

  // TODO HERE
  // TEST: adding a question round

  // TEST: adding a final round

  // TEST: changing the current round's state to "ADDING ANSWERS"

  // **Integration tests**
  // TEST: Should not start a game with 1 or 2 players
  // TEST 6: should start a game with no more than 8 players
  // TEST 11: should receive question responses from players
  // TEST 12: should move to a voting round
  // TEST 13: should receive votes from players
  // TEST 14: should receive votes from the audience
  // TEST 15: should update the leaderboard
  // TEST 16: should move to the leaderboard
  // TEST 17: should move to the end game screen
  // TEST 18: should move to the start game screen
});
