import AV from './AV'
import {
  Realtime,
  Message,
  TextMessage
  } from '../../node_modules/leancloud-realtime/dist/realtime.browser'

var realtime
var userObj = AV.User.current()
const userId = userObj.id

realtime = new Realtime({
  appId: 'SXHKYLU066nSzpRhnqNoLK7v-gzGzoHsz',
  region: 'cn'
})

console.log(realtime);

function init (members) {

  // Tom 用自己的名字作为 clientId，获取 IMClient 对象实例
  return realtime.createIMClient(userId).then(function(room) {
    // 创建与Jerry之间的对话
    console.log(room)
    return room.createConversation({
      members: members,
      name: '对战房' + new Date().getTime()
    })
  }).then(function(conversation) {
    // 发送消息
    return conversation.send(new TextMessage('耗子，起床！'));
  }).catch(function (err) {
    console.log(err)
  })

}

export default {
  init
}
