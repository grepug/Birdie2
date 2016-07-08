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
          link-cell(v-link="")
            span(slot="body") 地表最强（我 / 张衢）
            span(slot="footer") 10 / 5
          link-cell(v-link="")
            span(slot="body") 手动滑稽组合（我 / 李浩洋）
            span(slot="footer") 10 / 15
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    LinkCell
  } from 'vue-weui'

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell
    },
    vuex: {
      getters: {

      },
      actions: {

      }
    },
    methods: {
      back () {
        window.history.back()
      }
    },
    ready () {
      return
    }
  }
</script>

<style lang="less">

</style>
