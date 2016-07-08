import _ from 'underscore'
import {beArray} from '../../js/utils'

const state = {
  matchResults: [],
  tournaments: [],
  doubles: [],
  notification: []
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
  },
  ADD_DOUBLES_OBJS (state, doublesObjs) {
    beArray(doublesObjs).forEach((el, index) => {
      var r = _.findWhere(state.doubles, {objectId: el.objectId})
      if (!r) state.doubles.push(el)
    })
  },
  ADD_NOTIFICATIONS (state, notificationObjs) {
    // // state.notification = _.extend(state.notification, notificationObjs)
    // for (var p in notificationObjs) {
    //   if (notificationObjs.hasOwnProperty(p)) {
    //     state.notification[p] = notificationObjs[p]
    //   }
    // }
    beArray(notificationObjs).forEach((el, index) => {
      state.notification.push(el)
    })
  }
}

export default {
  state,
  mutations
}
