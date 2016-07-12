<template lang="jade">
div
  navbar-view
    .left
      a.link(href="javascript:;", @click="back") 返回
    .center 设置
    .right
      a.link(href="javascript:;")
  main
    cells(type="access")
      link-cell(@click="logOut")
        span(slot="body") 登出
</template>

<script>
import {
  navbarView
} from '../components'
import {
  Cells,
  LinkCell
} from 'vue-weui'
import AV from '../js/AV'

export default {
  components: {
    navbarView,
    Cells,
    LinkCell
  },
  methods: {
    back () {
      window.history.back()
    },
    logOut () {
      if (!window.confirm('确认登出？')) return
      AV.User.logOut()
      window.location.reload()
    }
  }
}

</script>
