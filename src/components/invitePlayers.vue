<template lang="jade">
  .popup(v-show="isInvitePlayersPopupShow")
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
  import navbarview from './navbar'
  import {Cells, CheckboxCell} from 'vue-weui'
  import {getAllUsers} from '../vuex/actions/user'
  // import AV from '../js/AV'

  export default {
    components: {
      navbarview,
      Cells,
      CheckboxCell
    },
    vuex: {
      actions: {
        getAllUsers
      }
    },
    props: {
      isInvitePlayersPopupShow: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      checked: {
        type: Array,
        default () {
          return []
        }
      },
      cid: {
        type: String
      }
    },
    methods: {
      back () {
        this.isInvitePlayersPopupShow = false
      },
      confirm () {
        console.log(this.checked)
        console.log(this.cid)
        return
        // if (!this.checked.length) return
        // AV.Cloud.run('match', {
        //   method: 'invite',
        //   cid: this.$route.params.cid,
        //   invitee: this.checked.map(x => {
        //     return {
        //       openid: this.list[x].openid,
        //       objectId: this.list[x].objectId
        //     }
        //   })
        // })
      }
    },
    ready () {
      this.getAllUsers().then(ret => {
        this.list = ret
      })
    }
  }
</script>

<style lang="less" scoped>
  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999;
    background-color: #eee;
  }
</style>
