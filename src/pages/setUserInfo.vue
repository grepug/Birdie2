<template lang="jade">
  div
    navbar-view
      .left
      .center 用户信息
      .right
        a.link(href="javascript:;", @click="save") 保存
    main
      cells(type="form")
        input-cell(type="text", label="昵称", :value.sync="nickname")
        select-cell(:after="true", :options="sexOptions", :selected.sync="sexSelected")
          span(slot="header") 性别
</template>

<script>
  import {
    Cells,
    InputCell,
    SelectCell
  } from 'vue-weui'
  import {
    navbarView
  } from '../components'
  import AV from '../js/AV'

  export default {
    components: {
      Cells,
      InputCell,
      SelectCell,
      navbarView
    },
    data () {
      return {
        nickname: '',
        sexOptions: [{text: '请选择', value: '0'}, {text: '男', value: '1'}, {text: '女', value: '2'}],
        sexSelected: '0'
      }
    },
    methods: {
      save () {
        return AV.User.current().save({
          nickname: this.nickname,
          sex: this.sex
        }).then(ret => {
          window.location.reload()
        })
      }
    }
  }
</script>

<style lang="less">
.weui_select_after .weui_select {
  padding-left: 15px;
}
</style>
