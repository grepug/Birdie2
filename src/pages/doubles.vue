<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="historyBack") 返回
      .center 双打队伍
      .right
        a.link(v-link="{path: '/user/doubles/createDoubles'}") 创建
    main
      .teams
        cells(type="access")
          link-cell(v-link="", v-for="el in doubles")
            span(slot="body") {{el.name}} {{el.players[0].nickname}} / {{el.players[1].nickname}}
            span(slot="footer")
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    LinkCell
  } from 'vue-weui'
  import {historyBack} from '../js/utils'
  import {addDoublesObjs} from '../vuex/actions/data'

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell
    },
    vuex: {
      getters: {
        doubles: ({data}) => data.doubles
      },
      actions: {
        addDoublesObjs
      }
    },
    computed: {
    },
    methods: {
      historyBack
    },
    ready () {
      window.vm = this
      this.addDoublesObjs()
    }
  }
</script>

<style lang="less">

</style>
