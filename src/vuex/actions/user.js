import AV from '../../js/AV'
import _ from 'lodash'
import {beArray} from '../../js/utils'

export const getAllUsers = function ({ dispatch, state }) {
  return AV.Cloud.run('user', {
    method: 'all'
  }).then(ret => {
    dispatch('ADD_OTHER_USEROBJS', ret)
  }).catch(err => console.log(err))
}

export const addOthersUserObj = function ({dispatch, state}, userObjIds) {
  var unstoredObjs = beArray(userObjIds).map(id => {
    var r = _.find(state.user.userObjs, {objectId: id})
    if (!r && id !== state.user.userObj.objectId) return id
    return null
  }).filter(x => x)
  if (!unstoredObjs.length) return
  return AV.Cloud.run('user', {
    method: 'getUserObjByIds',
    userObjIds: unstoredObjs
  }).then(ret => {
    if (!ret || !ret.length) return
    dispatch('ADD_OTHER_USEROBJS', ret)
  }).catch(err => console.log(err))
}

export const addDoubles = function ({dispatch, state}, doublesObjIds) {
  var unstoredObjs = beArray(doublesObjIds).map(id => {
    return _.find(state.user.doubles, {objectId: id}) ? null : id
  }).filter(x => x)
  if (!unstoredObjs.length) return Promise.resolve()
  return AV.Cloud.run('doubles', {
    method: 'getDoublesByIds',
    doublesObjIds: unstoredObjs
  }).then(ret => {
    if (!ret || !ret.length) return
    dispatch('ADD_DOUBLES', ret)
    return Promise.resolve(_.flattenDeep(ret.map(el => el.players)))
  }).catch(err => console.log(err))
}
