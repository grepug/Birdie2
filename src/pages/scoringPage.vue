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
  import clock from '../js/Clock'
  import _ from 'underscore'

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
          if (state.match.sideExchanged) index = index === 0 ? 1 : 0
          dispatch('CHANGE_MATCH_SCORES', index)
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
            after: '三局两胜'
          },
          scoringSys: {
            title: '得分制',
            after: '21分制'
          }
        }
      }

    },
    ready () {
      sortable.sortableToggle()
      clock.init((cl) => {
        this.clockTicking(cl, clock.duration)
      })
    }
  }
</script>

<style lang="less">

</style>
