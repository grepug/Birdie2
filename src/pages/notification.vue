<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="back") 返回
      .center 通知中心
      .right
        a.link(href="javascript:;")
    main
      cells(type="access")
        template(v-for="val in list", track-by="$index")
          link-cell(v-if="val && val.type === 'doublesInvitation'")
            span(slot="body") {{val.inviterNickname}}邀请你和TA组成双打队伍
            span(slot="footer")
</template>

<script>
  import {
    navbarView
  } from '../components'
  import {
    Cells,
    LinkCell
  } from 'vue-weui'
  import _ from 'underscore'
  import {addOthersUserObj} from '../vuex/actions/user'
  import {getOthersUserObj, getNotifications} from '../vuex/getters'

  export default {
    components: {
      navbarView,
      Cells,
      LinkCell
    },
    vuex: {
      getters: {
        othersUserObj: getOthersUserObj,
        notifications: getNotifications
      },
      actions: {
        addOthersUserObj
      }
    },
    computed: {
      list () {
        if (!this.notifications.length) return []
        return _.map(this.notifications, (val) => {
          if (val && val.type === 'doublesInvitation') {
            var r = _.findWhere(this.othersUserObj, {objectId: val.inviterObjId})
            if (r) {
              val.inviterNickname = r.nickname
              return val
            }
          }
        })
      }
    },
    data () {
      return {
        listRaw: {}
      }
    },
    methods: {
      back () {
        window.history.back()
      }
    },
    ready () {
      window.vm = this
      window._ = _
    }
  }
</script>

<style lang="less">

</style>
