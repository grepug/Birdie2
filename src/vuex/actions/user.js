import AV from '../../js/AV'
import _ from 'underscore'

export const getAllUsers = function ({ dispatch, state }) {
  return AV.Cloud.run('user', {
    method: 'all'
  }).then(ret => {
    dispatch('ADD_OTHER_USEROBJS', ret)
  }).catch(err => console.log(err))
}

export const addOthersUserObj = function ({dispatch, state}, userObjIds) {
  var unstoredObjs = userObjIds.map(id => {
    var r = _.findWhere(state.user.userObjs, {objectId: id})
    if (!r && id !== state.user.userObj.objectId) return id
    return null
  }).filter(x => x)
  if (!unstoredObjs.length) return
  return AV.Cloud.run('user', {
    method: 'getUserObjByIds',
    userObjIds: unstoredObjs
  }).then(ret => {
    console.log(ret)
    if (!ret || !ret.length) return
    dispatch('ADD_OTHER_USEROBJS', ret)
  }).catch(err => console.log(err))
}

export const setOthersUserObj = function ({dispatch}, userObjIds) {

}
