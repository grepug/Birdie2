<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center(v-text="title")
      .right
        a.link(href="javascript:;", @click="invitePlayers", v-if="isHost") 邀请
    main
      .main-tournament(v-if="!$route.query.sub")
        cells
          cell()
            span(slot="body") 赛事名
            span(slot="footer", v-text="thisTournament.name")
          cell()
            span(slot="body") 地点
            span(slot="footer", v-text="thisTournament.location")
          cell()
            span(slot="body") 开始时间
            span(slot="footer", v-text="thisTournamentStartAt")
          .description(v-text="thisTournament.description")
        cells-title 子赛事
          cells(type="access")
            cell(v-for="el in thisTournament.subTournaments", v-link="{query: {id: thisTournament.objectId, sub: el.objectId}}")
              span(slot="body", v-text="el.name + ' ' + el.discipline")
              span(slot="footer") 报名截止{{el.signUpDue}}
      .sub-tournaments(v-if="$route.query.sub")
        cells
          cell()
            span(slot="body") 子赛事名
            span(slot="footer", v-text="thisSubTournament.name")
          cell()
            span(slot="body") 项目
            span(slot="footer", v-text="thisSubTournament.discipline")
          cell()
            span(slot="body") 局数
            span(slot="footer", v-text="thisSubTournament.bestOf")
          cell()
            span(slot="body") 得分制
            span(slot="footer", v-text="thisSubTournament.scoringSys")
        .button-area
          weui-button(type="primary", :plain="true", @click="signUp", :disabled="thisSubTournament.hasSignedUp") {{signUpButtonText}}
</template>

<script>
  import {
    navbarView
  } from '../components'
  import _ from 'underscore'
  import {addTournaments} from '../vuex/actions/data'
  import {
    Cells,
    Cell,
    CellsTitle,
    SelectCell,
    LinkCell,
    Button
  } from 'vue-weui'
  import AV from '../js/AV'
  import nicetime from '@grepug/nicetime'

  export default {
    components: {
      navbarView,
      Cells,
      Cell,
      CellsTitle,
      SelectCell,
      LinkCell,
      'weui-button': Button
    },
    vuex: {
      getters: {
        tournaments: ({data}) => data.tournaments
      },
      actions: {
        addTournaments,
        signUp ({dispatch}) {
          if (this.thisSubTournament.hasSignedUp) return
          if (window.confirm('确认报名?')) {
            return AV.Cloud.run('tournament', {
              method: 'signUp',
              id: this.$route.query.sub,
              isSingle: true
            }).then(ret => {
              dispatch('SUBTOURNAMENT_SIGNUP', this.$route.query.id, this.$route.query.sub)
            })
          }
        }
      }
    },
    computed: {
      thisTournament () {
        var id = this.$route.query.id
        return _.findWhere(this.tournaments, {objectId: id}) || {}
      },
      thisSubTournament () {
        var subId = this.$route.query.sub
        if (!this.thisTournament) return {}
        return _.findWhere(this.thisTournament.subTournaments, {objectId: subId}) || {}
      },
      thisTournamentStartAt () {
        return nicetime(this.thisTournamentStartAt)
      },
      title () {
        if (this.$route.query.sub) return '子赛事'
        return this.thisTournament.name
      },
      signUpButtonText () {
        if (this.thisSubTournament.hasSignedUp) return '已报名'
        return '报名'
      }
    },
    methods: {
      back () {
        return window.history.back()
      }
    },
    ready () {
      window.vm = this
      var id = this.$route.query.id
      if (!id) this.$router.go('/tournaments')
      this.addTournaments(id)
    }
  }
</script>

<style lang="less">

  .description {
    padding: 10px 15px;
    border-top: 1px solid #d9d9d9;
  }

  .button-area {
    margin-top: 1rem;
  }

</style>
