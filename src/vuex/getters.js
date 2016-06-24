import _ from 'underscore'

export const getUserObj = state => {
  return state.user.userObj
}

// export const getMatchRoomMembers = state => {
//   return state.matchRoom.members
// }

export const currentTeams = state => {
  console.log(state.match.teams)
  return state.match.teams
}

export const currentMatchSettings = state => {
  return state.match.matchSettings
}

export const getOthersUserObj = state => {
  return state.user.userObjs
}

export const getMembers = state => {
  return _.flatten(state.match.teams.concat(state.match.umpire))
}
