<template lang="jade">
  NavbarView
    .left
      a.link(href="javascript:;", @click="back")
        i.fa.fa-arrow-left
    .center 发起比赛
    .right
      a.link(href="javascript:;", @click="invitePlayers", v-if="isHost") 邀请
  main
    sortableview(:list="list", @on-sort="onSort")
    section.match-settings
      select-cell(:after="true", :options="[{text: '三局两胜', value: 3},{text: '五局三胜', value: 5}, {text: '一局一胜', value: 1}]", :selected.sync="matchSettings.numberOfGames")
        span(slot="header") 局数
      select-cell(:after="true", :options="[{text: '21分制', value: 21},{text: '11分制', value: 11}, {text: '15分制', value: 15}]", :selected.sync="matchSettings.scoringSys")
        span(slot="header") 得分制
    .button-area
      weui-button(type="primary", :disabled="matchReady", v-if="isHost") 开始比赛
  ToastView(:text="toastText")
  InvitePlayersView(:is-Invite-Players-Popup-Show.sync="isInvitePlayersPopupShow", :cid="cid")

</template>

<script>
  import navbarview from '../components/navbar'
  import sortableview from '../components/sortableLists'
  import toastview from '../components/toast'
  import inviteplayersview from '../components/invitePlayers'
  import {SelectCell, Button} from 'vue-weui'
  import $ from 'jquery'
  import matchRoom from '../js/matchRoom'
  import sortable from '../js/sortable'
  import {getUserObj} from '../vuex/getters'
  import {changeTeams} from '../vuex/actions/match'

  export default {
    components: {
      navbarview,
      sortableview,
      toastview,
      inviteplayersview,
      SelectCell,
      'weui-button': Button
    },
    // store,
    vuex: {
      getters: {
        userObj: getUserObj
      },
      actions: {
        changeTeams
      }
    },
    data () {
      return {
        list: [],
        matchSettings: {
          numberOfGames: 1,
          scoringSys: 21
        },
        matchReady: true,
        isHost: false,
        cid: '',
        toastText: '',
        isInvitePlayersPopupShow: false
      }
    },
    computed: {
      list () {
        return []
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      onSort () {
        var memberLen = $('.sortable li').length
        $('.sortable ul li').removeClass('team1').removeClass('team2')
        $('.sortable ul li:nth-child(1)').addClass('team1')
        if (memberLen === 2) {
          $('.sortable ul li:nth-child(2)').addClass('team2')
        } else if (memberLen === 3) {
          $('.sortable ul li:nth-child(2)').addClass('team1')
          $('.sortable ul li:nth-child(3)').addClass('umpire')
        } else if (memberLen >= 4) {
          $('.sortable ul li:nth-child(2)').addClass('team1')
          $('.sortable ul li:nth-child(3)').addClass('team2')
          $('.sortable ul li:nth-child(4)').addClass('team2')
          $('.sortable ul li:nth-child(5)').addClass('umpire')
        }
        var order = getOrder()
        matchRoom.sendOrder(order)
      },
      invitePlayers () {
        this.isInvitePlayersPopupShow = true
      }
    },
    ready () {
      var cid = this.$route.query.cid
      if (cid) {
        matchRoom.join(cid, this).then((ret) => {
          console.log('加入成功', ret)
          this.toastText = '加入成功'
          this.list.push({
            title: this.userObj.id,
            after: this.userObj.get('sex')
          })
          this.onSort()
        })
      } else {
        matchRoom.create(this).then((ret) => {
          console.log(ret)
          this.toastText = '创建成功'
          console.log(this.userObj)
          this.list.push({
            title: this.userObj.id,
            after: this.userObj.get('sex')
          })
          sortable.sortableToggle('.sortable')
          this.onSort()
          this.cid = ret.id
          this.$watch('matchSettings', function (x, y) {
            console.log(x)
            matchRoom.sendOrder(null, {
              numberOfGames: x.numberOfGames,
              scoringSys: x.scoringSys
            })
          }, {
            deep: true
          })
        })
        this.isHost = true
      }
      this.onSort()
    }
  }

  function getOrder () {
    var arr = []
    $('.sortable li').map(function (index, el) {
      arr.push({
        title: $(el).find('.item-title').text(),
        after: $(el).find('.item-after').text()
      })
    })
    return arr
  }

</script>

<style lang="less">
  .weui_select_after .weui_select {
    padding-left: 15px;
  }
  .button-area {
    margin-top: 2rem;
  }
  main {
    position: relative;
    .sortable {
      margin-top: 1.8rem;
    }
    .team-indicator {
      position: absolute;
      left: 1rem;
    }
    .sortable ul {
      li {
        color: #000;
      }
      .team1 {
        background-color: red;
      }
      .team2 {
        background-color: blue;
      }
      .umpire {
        background-color: yellow;
      }
    }
   }
</style>
