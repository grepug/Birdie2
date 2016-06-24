<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back")
          i.fa.fa-arrow-left
      .center 发起比赛
      .right
        a.link(href="javascript:;", @click="invitePlayers", v-if="isHost") 邀请
    main
      actionsheet(:actions="actions", :show.sync="actionSheetShow", :menus="actionSheetMenus", :title="title", @weui-menu-click="click", @weui-menu-cancel="cancel")
      sortable-view(:list="list", @on-sort="onSort", @on-li-press="onLiPress")
      section.match-settings
        select-cell(:after="true", :options="[{text: '三局两胜', value: 3},{text: '五局三胜', value: 5}, {text: '一局一胜', value: 1}]", :selected.sync="matchSettings.bestOf")
          span(slot="header") 局数
        select-cell(:after="true", :options="[{text: '21分制', value: 21},{text: '11分制', value: 11}, {text: '15分制', value: 15}]", :selected.sync="matchSettings.scoringSys")
          span(slot="header") 得分制
      .button-area
        weui-button(type="primary", :disabled="!isMatchReady", v-if="isHost") 开始比赛
    toast-view(:text="toastText")
    invite-players-view(:is-Invite-Players-Popup-Show.sync="isInvitePlayersPopupShow", :cid="cid")

</template>

<script>
  import navbarView from '../components/navbar'
  import sortableView from '../components/sortableLists'
  import toastView from '../components/toast'
  import invitePlayersView from '../components/invitePlayers'
  import {SelectCell, Button, Actionsheet} from 'vue-weui'
  import $ from 'jquery'
  import _ from 'underscore'
  import matchRoom from '../js/matchRoomWd'
  import sortable from '../js/sortable'
  import {getUserObj, currentMatchSettings, getOthersUserObj, getMembers} from '../vuex/getters'
  import {changeTeams, addMember, changeMatchSettings, addMatchRoomInvitees} from '../vuex/actions/match'
  import {addOthersUserObj} from '../vuex/actions/user'

  window.$ = $

  export default {
    components: {
      navbarView,
      sortableView,
      toastView,
      invitePlayersView,
      SelectCell,
      Actionsheet,
      'weui-button': Button
    },
    vuex: {
      getters: {
        generalState: ({general}) => general.state,
        userObj: getUserObj,
        members: getMembers,
        currentMatchSettings,
        othersUserObj: getOthersUserObj,
        isMatchReady ({match}) {
          return !!match.matchReady
        },
        sortableListSorted: ({ui}) => ui.sortableListSorted
        // matchRoomMembers: ({match} => match.matchRoomStates.members)
      },
      actions: {
        changeTeams,
        addMember,
        changeMatchSettings,
        addOthersUserObj,
        setGeneralState: ({dispatch}, _s) => dispatch('CHANGE_GENERAL_STATE', _s),
        setRoomId: ({dispatch}, roomId) => dispatch('SET_ROOM_ID', roomId),
        setMatchRoomMembers: ({dispatch}, members) => dispatch('SET_MATCHROOM_MEMBERS', members),
        addMatchRoomInvitees
      }
    },
    data () {
      return {
        cid: '',
        toastText: '',
        isInvitePlayersPopupShow: false,
        actionSheetShow: false,
        actionSheetMenus: {
          kick: '移出房间',
          appointHost: '转让房主'
        },
        actions: {
          action1: '取消'
        }
      }
    },
    computed: {
      list () {
        var members = _.flatten(this.members)
        var after = (sex) => {
          return sex === 1 ? '<i class="fa fa-mars"></i>' : '<i class="fa fa-venus"></i>'
        }
        return members.map(id => {
          if (id === this.userObj.id) {
            return {
              title: this.userObj.get('nickname'),
              after: after(this.userObj.get('sex')),
              id: this.userObj.id
            }
          }
          var r = _.findWhere(this.othersUserObj, {objectId: id})
          if (r) {
            return {
              title: r.nickname,
              after: after(r.sex),
              id: r.objectId
            }
          }
          return {
            title: '加载中...',
            id
          }
        })
      },
      matchSettings () {
        return this.currentMatchSettings
      },
      sortableListSorted: () => this.sortableListSorted,
      isHost () {
        return this.generalState === 'matchPreparingHost'
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      onSort () {
        var order = getOrder()
        matchRoom.sendOrder(order)
      },
      onLiPress (index) {
        // if (this.members[index] === this.userObj.id) return
        this.actionSheetShow = true
      },
      addTeamIndicator () {
        var memberLen = $('.sortable li').length
        $('.sortable ul li').removeClass('team1').removeClass('team2')
        $('.sortable ul li:nth-child(1)').addClass('team1')
        if (memberLen === 2) {
          $('.sortable ul li:nth-child(2)').addClass('team2')
        } else if (memberLen === 3) {
          $('.sortable ul li:nth-child(2)').addClass('team2')
          $('.sortable ul li:nth-child(3)').addClass('umpire')
        } else if (memberLen >= 4) {
          $('.sortable ul li:nth-child(2)').addClass('team1')
          $('.sortable ul li:nth-child(3)').addClass('team2')
          $('.sortable ul li:nth-child(4)').addClass('team2')
          $('.sortable ul li:nth-child(5)').addClass('umpire')
        }
      },
      invitePlayers () {
        this.isInvitePlayersPopupShow = true
      }
    },
    ready () {
      var roomId = this.$route.query.roomId
      if (roomId) {
        $('select').attr('disabled', '')
        matchRoom.join(this, roomId)
        this.setGeneralState('matchPreparingNonHost')
        this.toastText = '加入房间'
      } else {
        matchRoom.create(this)
        this.setGeneralState('matchPreparingHost')
        this.toastText = '创建成功'
        sortable.sortableToggle('.sortable')
        this.$watch('matchSettings', function (x, y) {
          this.changeMatchSettings(x)
          matchRoom.sendMatchSettings({
            bestOf: x.bestOf,
            scoringSys: x.scoringSys
          })
        }, {
          deep: true
        })
      }
    }
    // ready () {
    //   var cid = this.$route.query.cid
    //   if (cid) {
    //     matchRoom.join(cid, this)
    //   } else {
    //     matchRoom.create(this).then((ret) => {
    //       console.log(ret)
    //       this.toastText = '创建成功'
    //       this.addMember(this.userObj.id)
    //       sortable.sortableToggle('.sortable')
    //       this.onSort()
    //       this.cid = ret.id
    //       this.$watch('matchSettings', function (x, y) {
    //         console.log(x)
    //         this.changeMatchSettings(x)
    //         matchRoom.sendOrder(null, {
    //           numberOfGames: x.numberOfGames,
    //           scoringSys: x.scoringSys
    //         })
    //       }, {
    //         deep: true
    //       })
    //     })
    //     this.isHost = true
    //   }
    //   this.onSort()
    // }
  }

  function getOrder () {
    var arr = []
    $('.sortable li').map(function (index, el) {
      arr.push($(el).data('id'))
    })
    console.log(arr)
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
        color: #fff;
        .fa {
          font-size: 1.1rem;
          color: #fff;
        }
        // .fa-mars {
        //   color: #09f;
        // }
        // .fa-venus {
        //   color: #f6c;
        // }
      }
      .team1 {
        background-color: #f60;
      }
      .team2 {
        background-color: lighten(blue, 15%);
      }
      .umpire {
        background-color: lighten(yellow, 15%);
      }
    }
   }
</style>
