<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 裁判
      .right
        a.link(href="javascript:;")
    main
      cells
        link-cell()
          span(slot="body") 场地
          span(slot="footer") {{court.courtNo}}
      cells-title 次序表
      cells(type="access")
        link-cell(v-for="(index, el) in court.orders", @click="clickOnOrders(index)")
          span(slot="body") {{el.teams[0].name}} vs. {{el.teams[1].name}}
          span(slot="footer", v-if="el.phase.stage === 'groups'") 小组赛 第{{el.phase.groupIndex + 1}}组 第{{el.phase.matchIndex + 1}}场
</template>

<script>
  import {
    navbarView
  } from '../../components'
  import {
    Cells,
    LinkCell,
    CellsTitle
  } from 'vue-weui'
  import _ from 'underscore'
  import AV from '../../js/AV'
  import Wilddog from '../../../node_modules/wilddog/lib/wilddog-node'

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell,
      CellsTitle
    },
    vuex: {
      getters: {
        userObj: ({user}) => user.userObj
      },
      actions: {
        updateTournamentData ({dispatch, state}) {
          var {query} = this.$route
          var ref = new Wilddog(`https://birdie2.wilddogio.com/tournaments/${query.main}/${query.sub}/courts`)
          ref.on('value', snapshot => {
            snapshot.forEach(data => {
              var val = data.val()
              if (val.umpire === this.userObj.objectId) {
                this.court = val
                dispatch('UPDATE_MY_UMPIRED_SUBTOURNAMENT_DATA', query.main, query.sub, val)
              }
              console.log(data.key())
              console.log(data.val())
            })
          })
        }
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      clickOnOrders (index) {
        var order = this.court.orders[index]
        if (this.court.orders[index].state !== 'finished') {
          this.$router.go({
            path: '/umpire/subTournament/scoringPage',
            query: _.extend(this.$route.query, {
              courtNo: this.court.courtNo,
              stage: order.phase.stage,
              groupIndex: order.phase.groupIndex,
              matchIndex: order.phase.matchIndex
            })
          })
        }
      }
    },
    data () {
      return {
        court: []
      }
    },
    ready () {
      window.vm = this
      var {query} = this.$route
      AV.Cloud.run('tournamentRealtime', {
        method: 'getMyUmpireData',
        tournamentObjId: query.main,
        subTournamentObjId: query.sub
      }).then(ret => {
        console.log(ret)
        this.court = ret
      }).catch(err => console.log(err))
    },
    destroyed () {
      console.log('destroyed')
    }
  }
</script>
