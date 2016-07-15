<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 用户中心
      .right
        a.link(href="javascript:;")
    main
      cells(type="access")
        link-cell(v-link="{path: '/user/userInfo'}")
          span(slot="body") 个人信息
          span(slot="footer")
        link-cell(v-link="{path: '/user/doubles'}")
          span(slot="body") 我的双打队伍
          span(slot="footer")
      cells(type="access")
        link-cell(v-link="{path: '/user/settings'}")
          span(slot="body") 设置
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

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell
    },
    methods: {
      back () {
        window.history.back()
      }
    }
  }
</script>

<style lang="less">

</style>
