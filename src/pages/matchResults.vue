<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;")
      .center 比赛结果
      .right
        a.link(href="javascript:;", @click="") 更多
    main(v-if="!$route.query.game")
      section.teams
        .team
          .team-head
            img(v-for="el in teams[0]", :src="el.headimgurl", :style="{borderColor: el.sex === 1 ? 'blue' : 'red'}")
          .name(v-text="name[0]")
          .scores(v-text="scores[0]")
        .points
          div(v-for="p in points", track-by="$index", v-text="p")
          div(style="color: transparent;") a
          div(style="color: transparent;") b
        .team
          .team-head
            img(v-for="el in teams[1]", :src="el.headimgurl", :style="{borderColor: el.sex === 1 ? 'blue' : 'red'}")
          .name(v-text="name[1]")
          .scores(v-text="scores[1]")
      sortable-lists-view(:list="list")
    div(v-show="$route.query.game === index + ''", v-for="(index, game) in games")
      p {{game.winner}}
</template>

<script>
  import {
    navbarView,
    sortableListsView
  } from '../components'
  import {addMatchResults} from '../vuex/actions/data'
  import _ from 'underscore'
  import {getUserObj} from '../methods/user'

  export default {
    components: {
      navbarView,
      sortableListsView
    },
    vuex: {
      getters: {
        matchResults: ({data}) => data.matchResults
      },
      actions: {
        addMatchResults
      }
    },
    computed: {
      matchObj () {
        return _.findWhere(this.matchResults, {objectId: this.$route.query.id})
      },
      teams () {
        if (!this.matchObj) return []
        return this.matchObj.teams.map(el => {
          return this.getUserObj(el)
        })
      },
      games () {
        if (!this.matchObj) return []
        return this.matchObj.games
      },
      name () {
        if (!this.matchObj) return ''
        return this.teams.map(el => el.map(e => e.nickname).join(' / '))
      },
      points () {
        if (!this.matchObj) return ''
        return this.matchObj.scoringArr.map(el => el.map(e => _.last(e)).join(' : '))
      },
      scores () {
        if (!this.matchObj) return ''
        return this.matchObj.scores
      },
      list () {
        if (!this.matchObj) return []
        return [
          {
            title: '项目',
            after: this.matchObj.discipline
          }, {
            title: '时长',
            after: this.matchObj.duration
          }, {
            title: '局数',
            after: this.matchObj.bestOf
          }, {
            title: '得分制',
            after: this.matchObj.scoringSys
          }, {
            title: '裁判',
            after: this.getUserObj(this.matchObj.umpire).map(el => el.nickname).join(' / ')
          }
        ]
      }
    },
    methods: {
      getUserObj
    },
    ready () {
      var matchObjId = this.$route.query.id
      if (matchObjId) {
        this.addMatchResults(matchObjId)
      } else {

      }
      window.vm = this
    }
  }
</script>

<style lang="less">
  main {
    .teams {
      width: 100%;
      > div {
        display: inline-block;
        text-align: center;
        width: 20%;
      }
      .team {
        width: 40%;
        .team-head {
          position: relative;
          img {
            width: 4rem;
            border-radius: 50%;
            border: 2px solid transparent;
            // &:nth-child(2) {
            //   position: absolute;
            //   right: 0.2rem;
            // }
          }
        }
        .point {
          color: red;
          font-size: 2.5rem;
        }
        .scores {
          font-size: 2.5rem;
          color: red;
        }
      }
    }
  }
</style>
