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
        link-cell(v-for="el in list")
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
  import AV from '../js/AV'

  export default {
    components: {
      navbarView,
      Cells,
      InputCell,
      CellsTitle,
      SelectCell,
      LinkCell
    },
    computed: {
      list () {
        return []
      }
    },
    ready () {
      AV.Cloud.run('tournament', {
        method: 'getAll'
      }).then(ret => {
        this.list = ret
      })
    }
  }
</script>

<style lang="less">

</style>
