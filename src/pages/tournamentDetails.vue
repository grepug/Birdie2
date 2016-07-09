<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center(v-text="title")
      .right
        a.link(href="javascript:;", @click="tournamentStart", v-if="isChairUmpire") 开始
    main
      .main-tournament(v-if="!$route.query.sub && thisTournament")
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
          weui-button(type="primary", :plain="true", @click="signUpUmpire", :disabled="thisSubTournament.hasSignedUpUmpire") {{signUpUmpireButtonText}}
</template>

<script>
  import {
    navbarView
  } from '../components'
  import _ from 'underscore'
  import {isSingle} from '../js/utils'
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
  import {addDoublesObjs, addTournaments} from '../vuex/actions/data'

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
        tournaments: ({data}) => data.tournaments,
        userObj: ({user}) => user.userObj,
        myDoubles: ({data}) => data.doubles
      },
      actions: {
        addDoublesObjs,
        addTournaments,
        signUp ({dispatch}) {
          if (this.thisSubTournamentHasSignedUp) return
          var _isSingle = isSingle(this.thisSubTournament.discipline)
          if (_isSingle) {
            if (window.confirm('确认报名?')) {
              return AV.Cloud.run('tournament', {
                method: 'signUp',
                id: this.$route.query.sub,
                isSingle: true
              }).then(ret => {
                dispatch('SUBTOURNAMENT_SIGNUP', this.$route.query.id, this.$route.query.sub, this.userObj.objectId)
              })
            }
          } else {
            return
          }
        },
        signUpUmpire ({dispatch}) {
          if (this.thisSubTournamentHasSignedUpUmpire) return
          if (window.confirm('确认报名裁判？')) {
            return AV.Cloud.run('tournament', {
              method: 'signUpUmpire',
              id: this.$route.query.sub
            }).then(ret => {
              dispatch('SUBTOURNAMENT_SIGNUP_UMPIRE', this.$route.query.id, this.$route.query.sub, this.userObj.objectId)
            })
          }
        }
      }
    },
    computed: {
      thisTournament () {
        var id = this.$route.query.id
        return _.findWhere(this.tournaments, {objectId: id})
      },
      thisSubTournament () {
        var subId = this.$route.query.sub
        if (!this.thisTournament) return {}
        return _.findWhere(this.thisTournament.subTournaments, {objectId: subId}) || {}
      },
      thisTournamentStartAt () {
        return nicetime({date: this.thisTournament.startAt}).get()
      },
      title () {
        if (this.$route.query.sub) return '子赛事'
        return this.thisTournament && this.thisTournament.name
      },
      thisSubTournamentHasSignedUp () {
        if (!this.thisSubTournament.discipline) return false
        if (isSingle(this.thisSubTournament.discipline)) {
          if (this.thisSubTournament.signUpMembers.indexOf(this.userObj.objectId) !== -1) return true
        } else {
          if (this.thisSubTournament.signUpMembers.map(el => {
            return _.findWhere(this.myDoubles, {objectId: el})
          }).filter(x => x).length > 0) return true
        }
        return false
      },
      thisSubTournamentHasSignedUpUmpire () {
        if (!this.thisSubTournament.signUpUmpires) return
        return this.thisSubTournament.signUpUmpires.indexOf(this.userObj.objectId) !== -1
      },
      signUpButtonText () {
        if (this.thisSubTournamentHasSignedUp) return '已报名'
        return '报名'
      },
      signUpUmpireButtonText () {
        if (this.thisSubTournamentHasSignedUpUmpire) return '已报名裁判'
        return '裁判报名'
      },
      isChairUmpire () {
        return this.thisTournament && this.thisTournament.chairUmpire.id === this.userObj.objectId
      }
    },
    methods: {
      back () {
        return window.history.back()
      },
      tournamentStart () {
        return
      }
    },
    ready () {
      window.vm = this
      var id = this.$route.query.id
      if (!id) this.$router.go('/tournaments')
      this.addTournaments(id)
      this.addDoublesObjs()
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
