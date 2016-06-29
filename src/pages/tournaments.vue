<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;")
      .center 赛事
      .right
        a.link(v-link="{path: '/createTournament'}") 创建
    main
      cells(type="access")
        link-cell(v-for="el in list", v-link="{path: '/tournaments/details', query: {id: el.objectId}}")
          span(slot="body", v-text="el.name")
          //- span(slot="footer", v-text="el.discipline")
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    InputCell,
    CellsTitle,
    SelectCell,
    LinkCell
  } from 'vue-weui'
  import {addTournaments} from '../vuex/actions/data'

  export default {
    components: {
      navbarView,
      Cells,
      InputCell,
      CellsTitle,
      SelectCell,
      LinkCell
    },
    vuex: {
      getters: {
        list: ({data}) => data.tournaments
      },
      actions: {
        addTournaments
      }
    },
    computed: {
    },
    data () {
      return {
      }
    },
    ready () {
      window.vm = this
      this.addTournaments()
    }
  }
</script>

<style lang="less">

</style>
