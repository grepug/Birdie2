import localforage from 'localforage'
import _ from 'underscore'

const KEY = 'match_snapshot'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'birdie2'
})

export default {

  revert (match) {

    return localforage.getItem(KEY)
    .then(ret => {
      ret = ret || []
      var len = ret.length
      if (ret.length > 1) ret.splice(len - 1, 1)
      console.log(ret)
      return localforage.setItem(KEY, ret)
    }).then(ret => {
      var len = ret.length
      var last = ret[len - 1]
      if (last) {
        console.log(last.gameNumber)
        _.extend(match, {
          matchGames: last.matchGames,
          gameNumber: last.gameNumber,
          lastScoredTeamIndex: last.lastScoredTeamIndex,
          matchScores: last.matchScores,
          matchState: last.matchState,
          scores: last.scores,
          scoresFlow: last.scoresFlow,
          sideExchanged: last.sideExchanged
        })
      }
    })


  },

  save ({match}) {

    return localforage.getItem(KEY)
    .then(ret => {
      ret = ret || []
      console.log(ret)
      ret.push(match)
      return localforage.setItem(KEY, ret)
    })

  },

  reset () {
    return localforage.removeItem(KEY)
  }


}
