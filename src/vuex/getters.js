import _ from 'underscore'

export const getUserObj = state => {
  return state.user.userObj
}

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

export const getMembers = state => {
  return _.flatten(state.court.teams.concat(state.court.umpire))
}
