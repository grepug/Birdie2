<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;")
          i.fa.fa-arrow-left
      .center 计分器
      .right
        a.link(href="javascript:;", @click="exchange") 更多
    main
      versus-view(:teams="teams", :points="scores", @on-add-point="addScore")
      sortable-lists-view(:list="toolList")
      .buttons
        a.button(href="javascript:;", @click="undo") 撤销
        a.button(href="javascript:;", @click="withdrawl") 退赛
        a.button(href="javascript:;", @click="pause") 暂停
      dialog(v-show="isGameInterval", type="alert", title="中场间歇", confirm-button="取消间歇", @weui-dialog-confirm="removeGameInterval")
        h4(style="text-align: center") 中场间歇还有{{gameIntervalTimer}}秒
      dialog(v-show="matchCompleted", type="alert", title="比赛结束", confirm-button="查看结果", @weui-dialog-confirm="viewResult")
      dialog(v-show="confirmDialogShow", type="confirm", title="提示", confirm-button="确定", @weui-dialog-confirm="confirm", @weui-dialog-cancel="confirmDialogShow = false")
        p(v-text="confirmDialogText")
    toast-view

</template>

<script>
  import {
    navbarView,
    toastView,
    versusView,
    sortableListsView
  } from '../components'
  import {
    Dialog
  } from 'vue-weui'
  import sortable from '../js/sortable'
  import Clock from '../js/Clock'
  import _ from 'underscore'

  const timer = new Clock()
  const clock = new Clock()

  export default {
    components: {
      navbarView,
      toastView,
      versusView,
      sortableListsView,
      Dialog
    },
    vuex: {
      getters: {
        matchClock: ({match}) => match.matchClock,
        scores: ({match}) => {
          var s = JSON.parse(JSON.stringify(match.scores))
          if (match.sideExchanged) s = {'0': s['1'], '1': s['0']}
          return s
        },
        currentMatchScore: ({match}) => {
          return match.matchGames.map(el => {
            return _.map(el.scores, el2 => el2).join(':')
          }).join(' ') + ' ' + _.map(match.scores, el => el).join(':')
        },
        teams: ({match, user}) => {
          var t = match.teams.map(el => el.map(id => {
            if (id === user.userObj.id) {
              return user.userObj.toJSON()
            }
            return _.findWhere(user.userObjs, {objectId: id})
          }))
          if (match.sideExchanged) t = t.reverse()
          return t
        },
        isGameInterval: ({match}) => match.isGameInterval,
        gameIntervalTimer: ({match}) => {
          var timeout = match.gameIntervalTimer
          return timeout === 0 ? '' : timeout
        },
        matchCompleted: ({match}) => match.matchState === 'completed'
      },
      actions: {
        clockTicking: ({dispatch}, cl, dur) => dispatch('CHANGE_MATCH_DURATION', cl, dur),
        addScore: ({dispatch, state}, index) => {
          var match = state.match
          if (match.matchState !== 'playing') return
          if (match.isGameInterval) return
          if (match.sideExchanged) index = index === 0 ? 1 : 0
          dispatch('CHANGE_GAME_SCORES', index)
          var opponentIndex = index === 0 ? 1 : 0
          var currentScoredTeamScore = match.scores[index]
          var currentOpponentTeamScore = match.scores[opponentIndex]
          var diff = currentScoredTeamScore - currentOpponentTeamScore
          var willInterval = match.matchSettings.intervalScore && currentScoredTeamScore === match.matchSettings.intervalScore && currentScoredTeamScore > currentOpponentTeamScore
          var willWinTheGame = diff >= 2 && currentScoredTeamScore >= match.matchSettings.scoringSys
          console.log(match.matchScores[index])
          console.log(Math.ceil(match.matchSettings.bestOf / 2))
          if (willInterval) {
            timer.initTimer(match.matchSettings.gameIntervalDuration, (secs) => {
              dispatch('SET_GAME_INTERVAL_TIMER', secs)
              if (secs <= 0) dispatch('REMOVE_GAME_INTERVAL')
            })
            dispatch('SET_GAME_INTERVAL')
          }
          if (willWinTheGame) { // 得分方赢得一局比赛
            console.log('complete')
            dispatch('PUSH_MATCH_GAME', index)
            var willWinTheMatch = willWinTheGame && (Math.ceil(match.matchSettings.bestOf / 2) === match.matchScores[index])
            if (willWinTheMatch) { // 赢得一场比赛
              console.log('match win')
              if (window.confirm('完成比赛？还是撤销上一分')) {
                clock.cancel() // 停下时钟
                dispatch('CHANGE_MATCH_STATE', 'completed')
              } else {
                dispatch('UNDO_LAST_SCORE', index)
              }
            } else {
              dispatch('ADD_GAME_NUMBER')
              dispatch('EXCHANGE_SIDES')
              dispatch('RESET_GAME_SCORES')
            }
          }
        },
        exchangeSide: ({dispatch}) => dispatch('EXCHANGE_TEAMS'),
        removeGameInterval: ({dispatch}) => {
          dispatch('REMOVE_GAME_INTERVAL')
          timer.cancel(timer.timer)
        },
        undoAction: ({dispatch}) => dispatch('UNDO_LAST_SCORE')
      }
    },
    data () {
      return {
        confirmDialogShow: false,
        confirmDialogText: '',
        confirmDialogState: null
      }
    },
    methods: {
      exchange () {
        this.exchangeSide()
        window.vm = this
      },
      viewResult () {
        this.$router.go()
      },
      undo () {
        var match = this.$store.state.match
        if (match.matchState !== 'playing') return
        if (!match.scoresFlow.length) return
        this.confirmDialogText = '确定撤销上一分？'
        this.confirmDialogState = 'undo'
        this.confirmDialogShow = true
      },
      withdrawl () {
        return
      },
      pause () {
        return
      },
      confirm () {
        switch (this.confirmDialogState) {
          case 'undo':
            this.undoAction()
            break
          case 'pause':
            break
        }
        this.confirmDialogShow = false
        return
      }
    },
    computed: {
      toolList () {
        var match = this.$store.state.match
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
            after: bestOfCN(match.matchSettings.bestOf)
          },
          scoringSys: {
            title: '得分制',
            after: match.matchSettings.scoringSys + '分制'
          }
        }
      }

    },
    ready () {
      sortable.sortableToggle()
      clock.initClock((cl) => {
        this.clockTicking(cl, clock.duration)
      })
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
