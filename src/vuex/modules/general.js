const state = {
  state: 'normal' // normal, matchPreparingNonHost, matchPreparingHost, matchPlaying, matchUmpiring
}

const mutations = {
  'CHANGE_GENERAL_STATE' (state, _s) {
    state.state = _s
  }
}

export default {
  state,
  mutations
}
