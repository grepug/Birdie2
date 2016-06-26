import _ from 'underscore'
import localforage from 'localforage'
import snapshot from '../js/matchSnapshot'

const storage = {
  onInit (state, store) {
    snapshot.reset()
  },
  onMutation (mutation, state, store) {

    if (mutation.type === 'CHANGE_GAME_SCORES') {
      // var raw = localStorage.getItem('scoresFlow')
      // var scoresFlow = raw ? JSON.parse(raw) : []
      // scoresFlow.push(state.match)
      // localStorage.setItem('scoresFlow', JSON.stringify(scoresFlow))
      // console.log(scoresFlow)
      snapshot.save(state)
      .then(ret => {
        console.log(ret)
      })
    }

  }
}

export default storage


function getState () {

  var state = localStorage.getItem('vuex_state')

  state = state ? JSON.parse(state) : null

  return state

}

function getOthersUserObjFromLS () {

  var othersUserObj = localStorage.getItem('others_user_obj')

  othersUserObj = othersUserObj ? JSON.parse(othersUserObj) : null

  if (othersUserObj) {

    if (othersUserObj.expire < Date.now()) {

      localStorage.removeItem('others_user_obj')

    }

  }

  return othersUserObj
}
