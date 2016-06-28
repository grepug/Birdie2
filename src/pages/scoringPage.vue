<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;") 第{{gameNumber}}局
      .center 计分器
      .right
        a.link(href="javascript:;", @click="more") 更多
    main
      versus-view(:teams="teams", :points="scores", :scored-team="lastScoredTeamIndex", :side-exchanged="sideExchanged", @on-add-point="addScore", @on-head-click="headClick")
      sortable-lists-view(:list="toolList")
      .buttons
        a.button(href="javascript:;", @click="undo") 撤销
        a.button(href="javascript:;", @click="pause") 暂停
        a.button(href="javascript:;", @click="matchComplete", v-show="matchCompleted") 完成
      dialog(v-if="isGameInterval", type="alert", title="中场间歇", confirm-button="取消间歇", @weui-dialog-confirm="removeGameInterval")
        h4(style="text-align: center") 中场间歇还有{{gameIntervalTimer}}秒
      //- dialog(v-if="matchCompleted", type="alert", title="比赛结束", confirm-button="查看结果", @weui-dialog-confirm="viewResult")
      dialog(v-if="confirmDialogShow", type="confirm", title="提示", confirm-button="确定", @weui-dialog-confirm="confirm", @weui-dialog-cancel="confirmDialogShow = false")
        p(v-text="confirmDialogText")
      dialog(v-if="gameUndoDialogShow", type="confirm", title="提示", confirm-button="确定", cancel-button="撤销", @weui-dialog-confirm="noUndo", @weui-dialog-cancel="doUndo")
    toast-view
    actionsheet(:actions="actions", :show.sync="actionSheetShow", :menus="actionSheetMenus", :title="title", @weui-menu-click="menusClick")
    actionsheet(:actions="actions", :show.sync="actionSheetShow2", :menus="actionSheetMenus2", :title="title", @weui-menu-click="menusClick")

</template>

<script>
  import {
    navbarView,
    toastView,
    versusView,
    sortableListsView
  } from '../components'
  import {
    Dialog,
    Actionsheet
  } from 'vue-weui'
  import sortable from '../js/sortable'
  import Clock from '../js/Clock'
  import _ from 'underscore'
  import {addOthersUserObj} from '../vuex/actions/user'
  import {saveMatch} from '../vuex/actions/match'
  import snapshot from '../js/matchSnapshot'
  import {getUserObj} from '../methods/user'
  import {getMembers} from '../vuex/getters'
  import {toArray, exchange} from '../js/utils'

  const timer = new Clock()
  const clock = new Clock()

  export default {
    components: {
      navbarView,
      toastView,
      versusView,
      sortableListsView,
      Dialog,
      Actionsheet
    },
    vuex: {
      getters: {
        members: getMembers,
        matchClock: ({match}) => match.matchClock,
        scores: ({match}) => {
          var s = _.clone(match.scores)
          if (match.sideExchanged) s = {'0': s['1'], '1': s['0']}
          return s
        },
        currentMatchScore: ({match}) => {
          var ret = match.matchGames.map(el => {
            return toArray(el.scores).join(':')
          }).join(' ')
          if (match.matchState === 'playing') ret += ' ' + toArray(match.scores).join(':')
          return ret
        },
        teams: ({court, match, user}) => {
          var t = court.teams.map(el => el.map(id => {
            if (id === user.userObj.objectId) {
              return user.userObj
            }
            return _.findWhere(user.userObjs, {objectId: id}) ||
            {
              sex: 1,
              headimgurl: '',
              nickname: '加载中'
            }
          })).filter(x => x)
          if (match.sideExchanged) t = t.reverse()
          console.log(t)
          return t
        },
        isGameInterval: ({match}) => match.isGameInterval,
        gameIntervalTimer: ({match, court}) => {
          var timeout = match.gameIntervalTimer
          return timeout === 0 ? court.gameIntervalDuration : timeout
        },
        matchPlaying: ({match}) => match.matchState === 'playing',
        matchCompleted: ({match}) => match.matchState === 'completed',
        gameNumber: ({match}) => match.gameNumber,
        lastScoredTeamIndex: ({match}) => match.lastScoredTeamIndex,
        sideExchanged: ({match}) => match.sideExchanged
      },
      actions: {
        addOthersUserObj,
        clockTicking: ({dispatch}, cl, dur) => dispatch('CHANGE_MATCH_DURATION', cl, dur),
        addScore ({dispatch, state}, index) {
          var {match, court} = state
          if (match.matchState !== 'playing') return
          if (match.isGameInterval) return
          if (match.sideExchanged) index = exchange(index)
          dispatch('CHANGE_GAME_SCORES', index)
          var opponentIndex = exchange(index)
          var currentScoredTeamScore = match.scores[index]
          var currentOpponentTeamScore = match.scores[opponentIndex]
          var diff = currentScoredTeamScore - currentOpponentTeamScore
          var willInterval = court.intervalScore && currentScoredTeamScore === court.intervalScore && currentScoredTeamScore > currentOpponentTeamScore
          var willWinTheGame = diff >= 2 && currentScoredTeamScore >= court.scoringSys
          console.log(match.matchScores[index])
          console.log(Math.ceil(court.bestOf / 2))
          if (willInterval) {
            timer.initTimer(court.gameIntervalDuration, (secs) => {
              dispatch('SET_GAME_INTERVAL_TIMER', secs)
              if (secs <= 0) dispatch('REMOVE_GAME_INTERVAL')
            })
            dispatch('SET_GAME_INTERVAL')
          }
          if (willWinTheGame) { // 得分方赢得一局比赛
            console.log('complete')
            var willWinTheMatch = willWinTheGame && (Math.ceil(court.bestOf / 2) === match.matchScores[index] + 1)
            if (willWinTheMatch) { // 赢得一场比赛
              console.log('match win')
              dispatch('CHANGE_MATCH_STATE', 'completed')
              dispatch('PUSH_MATCH_GAME', index)
            } else {
              dispatch('PUSH_MATCH_GAME', index)
              dispatch('ADD_GAME_NUMBER')
              dispatch('EXCHANGE_SIDES')
              dispatch('RESET_GAME_SCORES')
            }
          }
        },
        exchangeSide: ({dispatch}) => dispatch('EXCHANGE_SIDES'),
        removeGameInterval: ({dispatch}) => {
          dispatch('REMOVE_GAME_INTERVAL')
          timer.cancel(timer.timer)
        },
        saveMatch,
        headClick ({dispatch, state}, index) {
          if (state.match.sideExchanged) index = exchange(index)
          this.actionSheet2Index = index
          this.actionSheetMenus2.withdrawl = this.getUserObj(state.court.teams[index]).map(x => x.nickname).join(' / ') + '退赛'
          this.actionSheetShow2 = true
        },
        setWithdrawl: ({dispatch, state}, index) => dispatch('SET_WITHDRAWL', index)
      }
    },
    data () {
      return {
        confirmDialogShow: false,
        confirmDialogText: '',
        confirmDialogState: null,
        gameUndoDialogShow: false,
        actions: {
          action1: '取消'
        },
        actionSheetMenus: {
          exchangeSide: '交换场地'
        },
        actionSheetMenus2: {
          withdrawl: '退赛'
        },
        actionSheetShow: false,
        actionSheetShow2: false,
        actionSheet2Index: null
      }
    },
    methods: {
      more () {
        this.actionSheetShow = true
      },
      menusClick (type) {
        console.log(type)
        switch (type) {
          case 'exchangeSide':
            this.exchangeSide()
            break
          case 'withdrawl':
            this.setWithdrawl(this.actionSheet2Index)
            this.matchComplete()
            break
        }
        this.actionSheetShow = false
      },
      viewResult () {
        this.$router.go()
      },
      undo () {
        var match = this.$store.state.match
        if (match.matchState === 'preparing') return
        if (!match.scoresFlow.length && !match.matchGames.length) return
        this.confirmDialogText = '确定撤销上一分？'
        this.confirmDialogState = 'undo'
        this.confirmDialogShow = true
      },
      matchComplete () {
        clock.cancel()
        this.saveMatch()
      },
      undoBetweenGames (cb, cb1) {

      },
      doUndo () {

      },
      noUndo () {

      },
      pause () {
        return
      },
      confirm () {
        switch (this.confirmDialogState) {
          case 'undo':
            snapshot.revert(this.$store.state.match)
            break
          case 'pause':
            break
        }
        this.confirmDialogShow = false
        return
      },
      getUserObj
    },
    computed: {
      toolList () {
        var {court} = this.$store.state
        var bestOfCN = (b) => {
          if (b === 1) return '一局一胜'
          if (b === 3) return '三局两胜'
          if (b === 5) return '五局三胜'
        }
        return {
          scores: {
            title: '得分',
            after: this.currentMatchScore
          },
          clock: {
            title: '时钟',
            after: this.matchClock
          },
          discipline: {
            title: '比赛项目',
            after: '男子单打'
          },
          bestOf: {
            title: '局数',
            after: bestOfCN(court.bestOf)
          },
          scoringSys: {
            title: '得分制',
            after: court.scoringSys + '分制'
          }
        }
      }

    },
    ready () {
      sortable.sortableToggle()
      snapshot.save(this.$store.state)
      // clock.initClock((cl) => {
      //   this.clockTicking(cl, clock.duration)
      // })
      this.addOthersUserObj(this.members)
      window.vm = this
    }
  }
</script>

<style lang="less">
  main {
    .buttons {
      width: 100%;
      text-align: center;
      .button {
        display: inline-block;
        width: 25%;
        border: 1px solid;
        margin-right: 1rem;
      }
    }
  }
</style>
