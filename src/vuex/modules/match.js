const state = {
  teams: [],
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
  scores: []
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
  }
}

export default {
  state,
  mutations
}
