import _ from 'underscore'
import {
  Realtime,
  Message,
  TextMessage
} from '../../node_modules/leancloud-realtime/dist/realtime.browser'

var realtime
var __conv

window.TextMessage = TextMessage

realtime = new Realtime({
  appId: 'SXHKYLU066nSzpRhnqNoLK7v-gzGzoHsz',
  region: 'cn'
})

function create (_this) {
  window.vm = _this
  return realtime.createIMClient(_this.userObj.id).then(function(cli) {
    console.log(cli)
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
          _this.addMember(payload.members[0])
          // _this.changeTeams(_this.list)
          _this.addOthersUserObj(_.flatten(_this.list))
          _this.toastText = '有人进来了'
        }
        sendOrder(_this.members, null)
      }
    })
  }).catch(function (err) {
    console.log(err)
  })

}

function join (cid, _this) {
  window.vm = _this
  return realtime.createIMClient(_this.userObj.id).then(function (cli) {
    console.log(cli)
    return cli.getConversation(cid)
  }).then(function (conv) {
    window.conv = conv
    __conv = conv
    console.log('当前 Conversation 的成员列表：', conv.members);
    return conv
  }).then(cov => {
    return conv.join()
  }).then(ret => {
    console.log('加入成功', ret)
    _this.toastText = '加入成功'
    console.log(_this.userObj.id)
    _this.addMember(_this.userObj.id)
    _this.onSort()

    __conv.on('message', function (msg) {
      console.log('msg', msg)
      var attr = msg.attributes
      if (attr.method === 'memberList') {
        // attr.list && _this.$set('list', attr.list)
        attr.list && _this.changeTeams(attr.list)
        // attr.matchSettings && _this.$set('matchSettings', attr.matchSettings)
        attr.matchSettings && _this.changeMatchSettings(attr.matchSettings)
        _this.toastText = `有人进来了`
      }
    })
    __conv.on('membersjoined', function () {
      console.log(arguments[0])
    })
  }).catch(err => console.log(err))
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
