<template lang="jade">
  NavbarView
    .left
      a.link(href="javascript:;", @click="back")
        i.fa.fa-arrow-left
    .center 邀请
    .right
      a.link(href="javascript:;", @click="confirm") 确认
  main
    .list
      Cells(type="checkbox")
        Checkbox-Cell(:label="el.nickname", name="checkbox", :value="index + ''", :checked.sync="checked", v-for="(index, el) in list")

</template>

<script>
  import navbarview from '../components/navbar'
  import {Cells, CheckboxCell} from 'vue-weui'
  // import matchRoom from '../js/matchRoom'
  import AV from '../js/AV'
  // import $ from '../js/Dom7'

  export default {
    components: {
      navbarview,
      Cells,
      CheckboxCell
    },
    data () {
      return {
        list: [],
        checked: []
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      confirm () {
        if (!this.checked.length) return
        AV.Cloud.run('match', {
          method: 'invite',
          cid: this.$route.params.cid,
          invitee: this.checked.map(x => {
            return {
              openid: this.list[x].openid,
              objectId: this.list[x].objectId
            }
          })
        })
      }
    },
    ready () {
      AV.Cloud.run('user', {
        method: 'all'
      }).then((ret) => {
        this.list = ret
        console.log(ret)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
</script>

<style lang="less">
</style>
