const state = {
  members: [],
  matchSettings: {}
}

const mutations = {
  ['CHANGE_MEMBERS'] (state, members) {
    state.members = members
  }
}

export {
  state,
  mutations
}
