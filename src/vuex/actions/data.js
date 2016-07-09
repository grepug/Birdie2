import AV from '../../js/AV'
import {toArray, exchange, beArray} from '../../js/utils'
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

export const addTournaments = ({dispatch, state}, ids) => {
  return AV.Cloud.run('tournament', {
    method: 'get',
    ids: ids ? beArray(ids) : null
  }).then(ret => {
    var myUmpiredTournaments = ret.map(el => {
      el.subTournaments = el.subTournaments.map(el2 => {
        if (el2.umpires.indexOf(state.user.userObj.objectId) !== -1) return el2
      }).filter(x => x)
      return el
    }).filter(x => x)
    dispatch('ADD_TOURNAMENTS', ret)
    dispatch('ADD_MY_UMPIRED_TOURNAMENTS', myUmpiredTournaments)
  })
}

export const addDoublesObjs = ({dispatch, state}) => {
  return AV.Cloud.run('doubles', {
    method: 'getMyDoubles'
  }).then(ret => {
    console.log(ret)
    dispatch('ADD_DOUBLES_OBJS', ret)
  })
}
