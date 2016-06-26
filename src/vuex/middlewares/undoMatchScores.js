import _ from 'underscore'

var scoresFlow = []

const undoMatchScores = {
  onInit (state, store) {

  },
  onMutation (mutation, state, store) {

    if (mutation.type === 'CHANGE_GAME_SCORES') {
      scoresFlow.push(state.match)
    }

  }
}

export default undoMatchScores
