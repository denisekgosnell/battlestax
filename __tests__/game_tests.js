// Game run spec
// - it should start a new game
// - it should add a vip
// - it should add players
// - it should start a game with at least 3 players
// - it should start a game with no more than 8 players
// - it should allow audience members
// - it should allow the game to start
// - it should move to the game tutorial
// - it should move to a question round
// - it should receive question responses from players
// - it should move to a voting round
// - it should receive votes from players
// - it should receive votes from the audience
// - it should update the leaderboard
// - it should move to the leaderboard
// - it should move to the end game screen
// - it should move to the start game screen

import reducer, { initialState} from '../src/redux/reducer'

// TEST 1: start a new game
describe('start a new game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toMatchSnapshot()
  })

  it('should handle INIT_GAME request', () => {
    expect(
      reducer(initialState,
      {
        type: 'INIT_GAME'
      })
    ).toMatchSnapshot()
  })
})