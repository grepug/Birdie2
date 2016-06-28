import AV from '../../js/AV'
import {toArray, exchange} from '../../js/utils'
import _ from 'underscore'
import {addOthersUserObj} from './user'

export const addMatchResults = ({dispatch, state}, matchObjId) => {
  var r = _.findWhere(state.data.matchResults, {objectId: matchObjId})
  if (!r) {
    return AV.Cloud.run('match', {
      method: 'getMatch',
      matchObjId
    }).then(ret => {
      // if (!ret || !ret.results || !ret.results.length) return
      // var result = ret.results[0]
      console.log(ret)
      dispatch('ADD_MATCH_RESULTS', ret)
      var userObjIds = _.flatten(ret.teams.concat(ret.umpire))
      addOthersUserObj({dispatch, state}, userObjIds)
    }).catch(err => console.log(err))
  }
}
