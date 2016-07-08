<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 双打队伍
      .right
        a.link(v-link="{path: '/user/doubles/createDoubles'}") 创建
    main
      .teams
        cells(type="access")
          link-cell(v-link="", v-for="el in doubles")
            span(slot="body") {{el.name}} （{{el.players[0].nickname}} / {{el.players[1].nickname}}）
            span(slot="footer") 10 / 5
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    LinkCell
  } from 'vue-weui'
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
      back () {
        window.history.back()
      }
    },
    ready () {
      window.vm = this
      this.addDoublesObjs()
    }
  }
</script>

<style lang="less">

</style>
