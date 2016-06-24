<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;")
          i.fa.fa-arrow-left
      .center 计分器
      .right
        a.link(href="javascript:;") 更多
</template>

<script>
  import navbarView from '../components/navbar'

  export default {
    components: {
      navbarView
    },
    created () {
      return
    }
  }
</script>

<style lang="less">

</style>
