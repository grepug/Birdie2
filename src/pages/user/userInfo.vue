<template lang="jade">
div
  navbar-view
    .left
      a.link(href="javascript:;", @click="historyBack") 返回
    .center 个人信息
    .right
      a.link(href="javascript:;", @click="save") 保存
  main
    cells(type="form")
      input-cell(type="text", label="用户名", placeholder="请输入用户名（推荐真实姓名）", :value.sync="myUserObj.nickname")
</template>

<script>
import {
  navbarView
} from '../../components'
import {
  Cells,
  LinkCell,
  InputCell
} from 'vue-weui'
// import AV from '../../js/AV'
import {historyBack} from '../../js/utils'

export default {
  components: {
    navbarView,
    Cells,
    LinkCell,
    InputCell
  },
  vuex: {
    getters: {
      userObj: ({user}) => user.userObj
    }
  },
  computed: {
    myUserObj () {
      return this.userObj
    }
  },
  methods: {
    historyBack,
    save () {
      return
    }
  }
}

</script>
