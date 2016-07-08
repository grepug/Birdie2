import _ from 'underscore'

// export const getMatchRoomMembers = state => {
//   return state.matchRoom.members
// }

export const currentTeams = state => {
  return state.court.teams
}

export const currentMatchSettings = ({court}) => {
  return {
    scoringSys: court.scoringSys,
    bestOf: court.bestOf,
    intervalScore: court.intervalScore,
    gameIntervalDuration: court.gameIntervalDuration
  }
}

export const getOthersUserObj = state => {
  return state.user.userObjs
}

export const getUserObj = ({user}, userObjId) => {
  if (user.userObj.objectId === userObjId || !userObjId) {
    return user.userObj
  }
  var r = _.findWhere(user.userObjs, {objectId: userObjId})
  if (r) return r
}

export const getMembers = state => {
  return _.flatten(state.court.teams.concat(state.court.umpire))
}

export const getNotifications = state => {
  return state.data.notification
}
