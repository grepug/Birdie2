const state = {
  isUserLoged: false,
  userObj: null
}

const mutations = {
  USERLOGED (state) {
    state.isUserLoged = true
  },
  ['SET_USEROBJ'] (state, userObj) {
    state.userObj = userObj
  }
}

export default {
  state,
  mutations
}
