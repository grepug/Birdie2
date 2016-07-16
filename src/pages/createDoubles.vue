<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="historyBack") 返回
      .center 双打组队
      .right
        a.link(href="javascript:;")
    main
      cells(type="split")
        select-cell(:before="true", :options="attrOptions", :selected.sync="attrSelected")
          cell-input(slot="body", type="text", placeholder="请输入队友的用户名（姓名）", :value.sync="nickname", v-if="attrSelected === 'nickname'")
          cell-input(slot="body", type="tel", placeholder="请输入队友的手机号", :value.sync="phone", v-if="attrSelected === 'nickname'", v-if="attrSelected === 'phone'")
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
    CellInput,
    SelectCell,
    Button,
    CellsTitle
  } from 'vue-weui'
  import {historyBack} from '../js/utils'
  import AV from '../js/AV'

  export default {
    components: {
      navbarView,
      Cells,
      InputCell,
      CellInput,
      SelectCell,
      'weui-button': Button,
      CellsTitle,
      toastView
    },
    data () {
      return {
        // attrOptions: [{text: '用户名', value: 'nickname'}, {text: '手机号', value: 'phone'}],
        attrOptions: [{text: '手机号', value: 'phone'}],
        attrSelected: 'phone',
        phone: '',
        nickname: '',
        toastText: ''
      }
    },
    methods: {
      historyBack,
      send () {
        return AV.Cloud.run('doubles', {
          method: 'invite',
          phone: this.attrSelected === 'phone' && this.phone,
          nickname: this.attrSelected === 'nickname' && this.nickname
        }).then(ret => {
          this.toastText = '发送成功'
        }).catch(err => {
          console.log(err)
          this.toastText = err.message.errMsgCN
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
