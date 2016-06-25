import _ from 'underscore'

const storage = {
  onInit (state, store) {
    // console.log(state)

  },
  onMutation (mutation, state, store) {
    // console.log(mutation)
    localStorage.setItem('vuex_state', JSON.stringify(state))
    switch (mutation.type) {
      case 'USERLOGED':
        console.log('USERLOGED')
        break
      case 'ADD_OTHER_USEROBJS':

        break
      case 'CHANGE_GENERAL_STATE':
        switch (mutation.payload[0]) {
          case 'normal':

            break
          case 'matchPreparingHost':

            break
          case 'matchPreparingNonHost':

            break
          case 'playing':

            break
          case 'umpiring':

            break
        }
        break
      default:

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
