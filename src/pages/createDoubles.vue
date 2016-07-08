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
    toast-view(:text="toastText")
</template>

<script>
  import {
    navbarView,
    toastView
  } from '../components'
  import {
    Cells,
    InputCell,
    Button
  } from 'vue-weui'
  import AV from '../js/AV'

  export default {
    components: {
      navbarView,
      Cells,
      InputCell,
      'weui-button': Button,
      toastView
    },
    data () {
      return {
        phone: '',
        toastText: ''
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      send () {
        return AV.Cloud.run('doubles', {
          method: 'invite',
          phone: this.phone
        }).then(ret => {
          this.toastText = '发送成功'
        }).catch(err => {
          this.toastText = err.errMsgCN
        })
      }
    }
  }
</script>

<style lang="less">
  .button-area {
    margin-top: 2rem;
  }
</style>
