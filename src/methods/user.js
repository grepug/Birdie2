import _ from 'underscore'

export const getUserObj = function (ids) {
  var user = this.$store.state.user
  if (!_.isArray(ids)) ids = [ids]
  return ids.map(el => {
    if (el === user.userObj.objectId) return user.userObj
    var r = _.findWhere(user.userObjs, {objectId: el})
    if (r) return r
    return {}
  })
}
