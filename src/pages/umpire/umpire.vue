<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 裁判
      .right
        a.link(href="javascript:;")
    main
      template(v-for="tournament in myUmpiredTournaments")
        cells-title {{tournament.name}}
        cells(type="access")
          link-cell(v-for="el in tournament.subTournaments", v-link="{path: '/umpire/subTournament', query: {main: tournament.objectId, sub: el.objectId}}")
            span(slot="body") {{el.name}}

</template>

<script>
  import {
    navbarView
  } from '../../components'
  // import AV from '../../js/AV'
  // import _ from 'underscore'
  import {
    Cells,
    LinkCell,
    CellsTitle
  } from 'vue-weui'
  import {addTournaments} from '../../vuex/actions/data'

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell,
      CellsTitle
    },
    vuex: {
      getters: {
        tournaments: ({data}) => data.tournaments,
        myUmpiredTournaments: ({data}) => data.myUmpiredTournaments,
        userObj: ({user}) => user.userObj
      },
      actions: {
        addTournaments,
        addMyUmpiredTournaments: ({dispatch}) => {
          return
        }
      }
    },
    computed: {
    },
    methods: {
      back () {
        window.history.back()
      }
    },
    ready () {
      window.vm = this
      this.addTournaments()
      // AV.Cloud.run('tournament', {
      //   method: 'getMyUmpireSubTournaments'
      // }).then(ret => {
      //   this.list = ret
      //   console.log(ret)
      // })
    }
  }
</script>
