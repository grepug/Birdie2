<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 对阵
      .right
        a.link(href="javascript:;")
    main
      group(:list="list")
      .b
        bracket(:list="playoffs")
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {group, bracket} from 'vue-bracket'
  import Wilddog from '../../node_modules/wilddog/lib/wilddog-node'

  export default {
    components: {
      navbarView,
      group,
      bracket
    },
    data () {
      return {
        list: [],
        playoffs: []
      }
    },
    methods: {
      back () {
        window.history.back()
      }
    },
    ready () {
      var query = this.$route.query
      var ref = new Wilddog(`https://birdie2.wilddogio.com/tournaments/${query.id}/${query.sub}`)
      ref.on('value', (snapshot) => {
        snapshot.forEach(data => {
          var key = data.key()
          var val = data.val()
          if (key === 'groups') {
            this.list = val
          }
          if (key === 'playoffs') {
            this.playoffs = val
          }
          console.log(data.key())
          console.log(data.val())
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  main {
    .b {
      overflow-x: scroll;
    }
  }
</style>
