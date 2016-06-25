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
    toast-view

</template>

<script>
  import {
    navbarView,
    toastView,
    versusView,
    sortableListsView
  } from '../components'
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
      sortableListsView
    },
    vuex: {
      getters: {
        matchClock: ({match}) => match.matchClock,
        scores: ({match}) => {
          var s = JSON.parse(JSON.stringify(match.scores))
          if (match.sideExchanged) s = {'0': s['1'], '1': s['0']}
          return s
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
        }
      },
      actions: {
        clockTicking: ({dispatch}, cl, dur) => dispatch('CHANGE_MATCH_DURATION', cl, dur),
        addScore: ({dispatch, state}, index) => {
          var match = state.match
          if (match.sideExchanged) index = index === 0 ? 1 : 0
          dispatch('CHANGE_GAME_SCORES', index)
          var opponentIndex = index === 0 ? 1 : 0
          var currentScoredTeamScore = match.scores[index]
          var currentOpponentTeamScore = match.scores[opponentIndex]
          var diff = currentScoredTeamScore - currentOpponentTeamScore
          console.log(currentScoredTeamScore)
          console.log(currentOpponentTeamScore)
          if (match.matchSettings.intervalScore && currentScoredTeamScore === match.matchSettings.intervalScore) {
            dispatch('SET_GAME_INTERVAL')
            timer.initTimer(10, (secs) => {
              dispatch('SET_GAME_INTERVAL_TIMER', secs)
              if (secs <= 0) dispatch('REMOVE_GAME_INTERVAL')
            })
          }
          if (diff >= 2 && currentScoredTeamScore >= match.matchSettings.scoringSys) { // 得分方赢得一局比赛
            console.log('complete')
            dispatch('PUSH_MATCH_GAME', index)
            if (Math.ceil(match.matchSettings.bestOf / 2) === match.matchScores[index]) { // 赢得一场比赛
              clock.cancel() // 停下时钟
            } else {
              dispatch('ADD_GAME_NUMBER')
              dispatch('EXCHANGE_SIDES')
              dispatch('RESET_GAME_SCORES')
            }
          }
        },
        exchangeSide: ({dispatch}) => dispatch('EXCHANGE_TEAMS')
      }
    },
    data () {
      return {

      }
    },
    methods: {
      exchange () {
        this.exchangeSide()
        window.vm = this
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

</style>
