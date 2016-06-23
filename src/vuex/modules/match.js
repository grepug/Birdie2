const state = {
  teams: [],
  umpire: [],
  matchSettings: {
    scoringSys: null,
    discipline: null,
    bestOf: null
  }
}

const mutations = {
  ['CHANGE_TEAMS'] (state, teams) {
    state.teams = teams.t
    state.umpire = teams.u || []
    state.matchSettings.discipline = teams.d
    console.log(state.teams)
  }
}

export default {
  state,
  mutations
}
