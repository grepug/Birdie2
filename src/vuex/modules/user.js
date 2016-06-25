import _ from 'underscore'

const state = {
  isUserLoged: false,
  userObj: null,
  userObjs: [{"sex":1,"nickname":"GreenDoG","username":"13700912872","headimgurl":"http://wx.qlogo.cn/mmopen/kqodNCVWpEvicpA0J4OAJEf9yUf7R05JssxHA0EP3lgU6eS2GYFMyv1Dlhibq8sICh3ZvnYPwczxic6WF5fH0XbBg/0","emailVerified":false,"openid":"oEOTEs-aW71gruOdtBGR0EtoXfKY","mobilePhoneNumber":"13700912872","authData":null,"mobilePhoneVerified":true,"objectId":"575d79e2df0eea00648bd3f6","createdAt":"2016-06-12T15:04:02.473Z","updatedAt":"2016-06-24T08:31:36.508Z"}]
}

const mutations = {
  ['USERLOGED'] (state) {
    state.isUserLoged = true
  },
  ['SET_USEROBJ'] (state, userObj) {
    state.userObj = userObj
  },
  ['ADD_OTHER_USEROBJS'] (state, userObjs) {
    userObjs.forEach(userObj => {
      var r = _.findWhere(state.userObjs, {objectId: userObj.objectId})
      if (!r) state.userObjs.push(userObj)
    })
  }
}

export default {
  state,
  mutations
}
