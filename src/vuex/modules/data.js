import _ from 'underscore'
import {beArray} from '../../js/utils'

const state = {
  matchResults: [],
  tournaments: []
}

const mutations = {
  ADD_MATCH_RESULTS (state, matchObj) {
    var r = _.findWhere(state.matchResults, {objectId: matchObj.objectId})
    if (!r) state.matchResults.push(matchObj)
  },
  ADD_TOURNAMENTS (state, tournamentObjs) {
    beArray(tournamentObjs).forEach(el => {
      var r = _.findWhere(state.tournaments, {objectId: el.objectId})
      if (!r) state.tournaments.push(el)
    })
  },
  SUBTOURNAMENT_SIGNUP (state, tournamentObjId, subTournamentObjId) {
    state.tournaments.forEach((el, index) => {
      if (el.objectId === tournamentObjId) {
        el.subTournaments.forEach((el2, index2) => {
          if (el2.objectId === subTournamentObjId) {
            state.tournaments[index].subTournaments[index2].hasSignedUp = true
          }
        })
      }
    })
  }
}

export default {
  state,
  mutations
}
