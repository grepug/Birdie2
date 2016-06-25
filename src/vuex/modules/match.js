const state = {
  teams: [['575251faa341310063bf7e22'],['575d79e2df0eea00648bd3f6']],
  umpire: [],
  discipline: null,
  matchSettings: {
    scoringSys: 21,
    bestOf: 3
  },
  roomId: null,
  matchRoomStates: {
    roomId: null,
    invitees: [],
    createdAt: null
  },
  matchReady: false,
  matchState: 'preparing',
  matchClock: '00:00:00',
  matchDuration: 0,
  // scores: {
  //   '1': 0,
  //   '2': 0
  // },
  scores: {
    "0": 0,
    "1": 0
  },
  scoresFlow: [],
  sideExchanged: false
}

const mutations = {
  ['CHANGE_TEAMS'] (state, teams) {
    state.teams = teams.t
    state.umpire = teams.u || []
    state.discipline = teams.d
  },
  ['ADD_MEMBER'] (state, member) {
    state.teams.push(member)
  },
  ['CHANGE_MATCH_SETTINGS'] (state, matchSettings) {
    state.matchSettings = matchSettings
  },
  ['CHANGE_MATCH_STATE'] (state, matchState) {
    state.matchState = matchState
  },
  ['CHANGE_MATCHROOM_STATE'] (state, isMatchReady) {
    state.matchReady = isMatchReady
  },
  ['SET_ROOM_ID'] (state, roomId) {
    state.matchRoomStates.roomId = roomId
  },
  ['SET_MATCHROOM_MEMBERS'] (state, members) {
    state.matchRoomStates.members = members
  },
  ['ADD_MATCHROOM_INVITEES'] (state, invitees) {
    state.matchRoomStates.invitees = state.matchRoomStates.invitees.concat(invitees)
  },
  ['CHANGE_MATCH_DURATION'] (state, cl, duration) {
    state.matchClock = cl
    state.matchDuration = duration
  },
  ['CHANGE_MATCH_SCORES'] (state, team) {
    state.scores[team]++
    state.scoresFlow.push({
      scoredTeam: team,
      duration: state.matchDuration
    })
  },
  ['EXCHANGE_TEAMS'] (state) {
    state.sideExchanged = !state.sideExchanged
  }
}

export default {
  state,
  mutations
}
