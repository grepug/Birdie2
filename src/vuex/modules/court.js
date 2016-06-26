const state = {
  // teams: [['575251faa341310063bf7e22'],['575d79e2df0eea00648bd3f6']],
  teams: [],
  umpire: [],
  discipline: null,
  scoringSys: 11,
  bestOf: 3,
  intervalScore: 2,
  gameIntervalDuration: 60,
  roomId: null,
  invitees: [],
  createdAt: null,
  matchReady: false
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
  ['SET_MATCHROOM_MEMBERS'] (state, members) {
    state.matchRoomStates.members = members
  },
  ['CHANGE_MATCH_SETTINGS'] (state, matchSettings) {
    state.matchSettings = matchSettings
  },
  ['CHANGE_MATCHROOM_STATE'] (state, isMatchReady) {
    state.matchReady = isMatchReady
  },
  ['SET_ROOM_ID'] (state, roomId) {
    state.roomId = roomId
  },
  ['ADD_MATCHROOM_INVITEES'] (state, invitees) {
    state.matchRoomStates.invitees = state.matchRoomStates.invitees.concat(invitees)
  }
}

export default {
  state,
  mutations
}
