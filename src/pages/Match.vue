<template lang="jade">
  NavbarView
    .left
      a.link(v-link="'/'")
        i.fa.fa-arrow-left
    .center 比赛
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
