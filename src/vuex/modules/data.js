import _ from 'underscore'

const state = {
  matchResults: []
}

const mutations = {
  ADD_MATCH_RESULTS (state, matchObj) {
    var r = _.findWhere(state.matchResults, {objectId: matchObj.objectId})
    if (!r) state.matchResults.push(matchObj)
  }
}

export default {
  state,
  mutations
}
