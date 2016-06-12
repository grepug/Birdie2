<template lang="jade">
  NavbarView
    .left
      a.link(href="javascript:;", @click="back")
        i.fa.fa-arrow-left
    .center 发起比赛
    .right
      a.link(href="javascript:;", @click="invitePlayers") 邀请
  main
    sortableview(:list="list", @on-sort="onSort")
    section.match-settings
      select-cell(:after="true", :options="['三局两胜','五局三胜','一局一胜']", :selected.sync="'一局一胜'")
        span(slot="header") 局数
      select-cell(:after="true", :options="['21分制','15分制','11分制']", :selected.sync="'21分制'")
        span(slot="header") 得分制
    .button-area
      weui-button(type="primary", :disabled="matchReady", v-if="isHost") 开始比赛


</template>

<script>
  import navbarview from '../components/navbar'
  import sortableview from '../components/sortableLists'
  import {SelectCell, Button} from 'vue-weui'
  import $ from '../js/Dom7'
  // import {matchRoomInit} from '../js/matchRoom'
  // import AV from '../js/AV'

  export default {
    components: {
      navbarview,
      sortableview,
      SelectCell,
      'weui-button': Button
    },
    data () {
      return {
        list: [{
          title: 'grepug',
          after: 'M'
        }, {
          title: 'sk',
          after: 'M'
        }, {
          title: 'abcc',
          after: '123'
        }, {
          title: '123'
        }],
        matchReady: true,
        isHost: false
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
        } else if (memberLen >= 3) {
          $('.sortable ul li:nth-child(2)').addClass('team1')
          $('.sortable ul li:nth-child(3)').addClass('team2')
          $('.sortable ul li:nth-child(4)').addClass('team2')
        }
      },
      invitePlayers () {
        var cid = '123'
        this.$router.go({
          path: `invitePlayers/${cid}`,
          append: true
        })
      }
    },
    ready () {
      this.onSort()
      // matchRoomInit()
      this.isHost = true
    }
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
        color: #fff;
      }
      .team1 {
        background-color: red;
      }
      .team2 {
        background-color: blue;
      }
    }
   }
</style>
