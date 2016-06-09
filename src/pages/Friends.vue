<template lang="jade">
  navbarview
    .left
      a.link(v-link="{path: '/'}")
        i.fa.fa-arrow-left
    .center 好友
    .right
</template>

<script>
  import navbarview from '../components/navbar'

  export default {
    components: {
      navbarview
    }
  }

</script>

<style lang="less">

</style>
