<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 裁判
      .right
        a.link(href="javascript:;")
    //- main
    //-   cells(type="access")
    //-     link-cell(v-for="el in list")
    //-       span(slot="body") {{el.name}}
</template>

<script>
  import {
    navbarView
  } from '../../components'

  export default {
    components: {
      navbarView
    },
    methods: {
      back () {
        window.history.back()
      }
    },
    ready () {
      window.vm = this
    }
  }
</script>
