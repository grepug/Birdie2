<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 创建双打队伍
      .right
        a.link(href="javascript:;")
    main
      cells(type="form")
        input-cell(type="tel", label="手机号", placeholder="请输入队友手机号", :value.sync="phone")
      .button-area
        weui-button(@click="send") 发送请求
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    InputCell,
    Button
  } from 'vue-weui'

  export default {
    components: {
      navbarView,
      Cells,
      InputCell,
      'weui-button': Button
    },
    data () {
      return {
        phone: ''
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      send () {
        return
      }
    }
  }
</script>

<style lang="less">
  .button-area {
    margin-top: 2rem;
  }
</style>
