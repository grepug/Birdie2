import _ from 'underscore'

const state = {
  matchState: 'playing', // preparing, playing, completed
  matchClock: '00:00:00',
  matchDuration: 0,
  scores: {
    "0": 0,
    "1": 0
  },
  scoresFlow: [],
  sideExchanged: false,
  matchGames: [],
  matchScores: {
    "0": 0,
    "1": 0
  },
  lastScoredTeamIndex: 1,
  gameNumber: 1,
  isGameInterval: false,
  gameIntervalTimer: 0,
  matchObjId: '576f4372816dfa0055dc974b',
  withdrawl: null
}

const mutations = {
  ['CHANGE_MATCH_STATE'] (state, matchState) {
    state.matchState = matchState
  },
  ['CHANGE_MATCH_DURATION'] (state, cl, duration) {
    state.matchClock = cl
    state.matchDuration = duration
  },
  ['CHANGE_GAME_SCORES'] (state, team) {
    state.scores[team]++
    state.scoresFlow.push({
      scoredTeam: team,
      duration: state.matchDuration
    })
    state.lastScoredTeamIndex = team
  },
  ['RESET_GAME_SCORES'] (state) {
    state.scores = {'0': 0, '1': 0}
  },
  ['EXCHANGE_SIDES'] (state) {
    state.sideExchanged = !state.sideExchanged
  },
  ['PUSH_MATCH_GAME'] (state, winnerIndex) {
    state.matchGames.push({
      scoresFlow: state.scoresFlow,
      winner: winnerIndex,
      duration: state.matchDuration,
      scores: state.scores
    })
    state.matchScores[winnerIndex]++
    state.scoresFlow = []
  },
  ['ADD_GAME_NUMBER'] (state) {
    state.gameNumber++
  },
  ['SET_GAME_INTERVAL'] (state) {
    state.isGameInterval = true
  },
  ['SET_GAME_INTERVAL_TIMER'] (state, secs) {
    state.gameIntervalTimer = secs
  },
  ['REMOVE_GAME_INTERVAL'] (state) {
    state.isGameInterval = false
    state.gameIntervalTimer = 0
  },
  ['SET_WITHDRAWL'] (state, index) {
    state.withdrawl = index
  }
}

export default {
  state,
  mutations
}
