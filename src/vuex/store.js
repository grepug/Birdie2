import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import match from './modules/match'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    match
  }
  // state,
  // mutations
})
