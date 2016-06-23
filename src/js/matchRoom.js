import AV from './AV'
import _ from 'underscore'
import {
  Realtime,
  Message,
  TextMessage
} from '../../node_modules/leancloud-realtime/dist/realtime.browser'

var realtime
var userObj = AV.User.current()
var __conv
const userId = userObj && userObj.id

window.TextMessage = TextMessage

realtime = new Realtime({
  appId: 'SXHKYLU066nSzpRhnqNoLK7v-gzGzoHsz',
  region: 'cn'
})

function create (_this) {

  return realtime.createIMClient(userId).then(function(cli) {
    cli.on('message', function (msg) {
      console.log(msg)
    })
    cli.on('membersleft', function (payload, conversation) {
      console.log(payload.members, payload.kickedBy, conversation.id)
    })
    return cli.createConversation({
      members: [],
      name: '对战房' + new Date().getTime()
    })
  }).then(function (conv) {
    __conv = conv
    return conv.on('membersjoined', function memberjoinedEventHandler(payload) {
      console.log(payload.members, payload.invitedBy)
      if (payload.members.indexOf(userId) === -1) { // unless the creator
        if (!_.findWhere(_this.list, {title: payload.members[0]})) {
          _this.list.push({
            title: payload.members[0],
            after: 'a'
          })
          _this.changeTeams(_this.list)
          _this.toastText = '有人进来了'
        }
        sendOrder(_this.list, null)
      }
    })
  }).catch(function (err) {
    console.log(err)
  })

}

function join (cid, _this) {
  return realtime.createIMClient(userId).then(function (cli) {
    return cli.getConversation(cid)
  }).then(function (conv) {
    window.conv = conv
    __conv = conv
    conv.on('message', function (msg) {
      var attr = msg.attributes
      if (attr === 'memberList') {
        attr.list && _this.$set('list', attr.list)
        attr.matchSettings && _this.$set('matchSettings', attr.matchSettings)
        _this.toastText = `有人进来了`
      }
    })
    conv.on('membersjoined', function () {
      console.log(arguments[0])
    })
    return conv.join()
  })
}

function sendOrder (order, matchSettings) {

  var msg = new TextMessage()
  msg.setAttributes({list: order, matchSettings, method: 'memberList'})
  __conv && __conv.send(msg)

}

export default {
  create,
  join,
  sendOrder
}
