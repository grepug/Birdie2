import Vue from 'vue'
import Vuex from 'vuex'
import storage from './storage'
import undoMatchScores from './middlewares/undoMatchScores'
import data from './modules/data'
import general from './modules/general'
import user from './modules/user'
import court from './modules/court'
import match from './modules/match'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    general,
    user,
    court,
    match,
    ui,
    data
  },
  middlewares: [storage, undoMatchScores]
  // state,
  // mutations
})
