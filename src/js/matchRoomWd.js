import Wilddog from '../../node_modules/wilddog/lib/wilddog-node'
import _ from 'underscore'
import api from './wilddogApi'

var matchRoomRef = new Wilddog("https://birdie2.wilddogio.com/matchRoom")
var roomId
var matchRoomIdRef

function create (_this) {
  window.vm = _this
  var room = matchRoomRef.push({
    members: [_this.userObj.objectId],
    invitees: [],
    host: _this.userObj.objectId,
    state: 'preparing',
    matchSettings: {
      scoringSys: null,
      discipline: null,
      bestOf: null
    },
    createdAt: new Date().getTime()
  })
  roomId = room.key()
  _this.setRoomId(roomId)
  matchRoomIdRef = matchRoomRef.child(roomId)
  console.log(roomId)
  matchRoomIdRef.on('value', snapshot => {
    snapshot.forEach(data => {
      switch (data.key()) {
        case 'members':
          var members = data.val()
          _this.addOthersUserObj(members)
          _this.changeTeams(members)
          setTimeout(() => {
            _this.addTeamIndicator()
          }, 500)
          break
      }
    })
  })
}

function join (_this, roomId) {
  var userObjId = _this.userObj.objectId
  _this.setRoomId(roomId)
  api.getInvitees(roomId)
  .then(ret => {
    console.log(ret)
    if (!ret) return
    var invitees = _.map(ret, v => v)
    if (invitees.indexOf(userObjId) == -1) return
    matchRoomIdRef = matchRoomRef.child(roomId)
    matchRoomIdRef.on('value', snapshot => {
      snapshot.forEach(data => {
        switch (data.key()) {
          case 'members':
            var members = data.val()
            if (members.indexOf(userObjId) === -1) {
              members.push(userObjId)
              matchRoomIdRef.child('members').set(members)
            }
            _this.changeTeams(members)
            _this.addOthersUserObj(members)
            setTimeout(() => {
              _this.addTeamIndicator()
            }, 500)
            break
          case 'matchSettings':
            _this.changeMatchSettings(data.val())
            break
        }
      })
    })
  })
}

function addInvitees (invitees, _this) {
  _this.addMatchRoomInvitees(invitees)
  matchRoomIdRef.child('invitees').set(_this.matchRoomInvitees)
  _this.toastText = '已发送邀请'
}

function sendOrder (order) {
  matchRoomIdRef.child('members').set(order)
}

function sendMatchSettings (set) {
  matchRoomIdRef.child('matchSettings').set(set)
}

export default {
  create,
  join,
  sendOrder,
  sendMatchSettings,
  addInvitees
}
