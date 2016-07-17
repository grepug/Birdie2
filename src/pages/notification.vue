<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="historyBack") 返回
      .center 通知中心
      .right
        a.link(href="javascript:;")
    main
      cells(type="access")
        template(v-for="(index, val) in list", track-by="$index")
          link-cell(v-if="val && val.type === 'doublesInvitation'", @click="openDialog(index)")
            span(slot="body") {{val.inviterNickname}}邀请你和TA组成双打队伍
            span(slot="footer") {{val.date}}
    dialog(v-show="dialogShow", type="confirm", title="提示", confirm-button="接受", cancel-button="拒绝", @weui-dialog-confirm="dialogConfirm", @weui-dialog-cancel="dialogCancel")
      p 是否接受邀请
    toast-view(:text="toastText")
</template>

<script>
  import {
    navbarView,
    toastView
  } from '../components'
  import {
    Cells,
    LinkCell,
    Dialog
  } from 'vue-weui'
  import _ from 'underscore'
  import AV from '../js/AV'
  import {historyBack} from '../js/utils'
  import {addOthersUserObj} from '../vuex/actions/user'
  import {getOthersUserObj, getNotifications} from '../vuex/getters'
  import nicetime from '@grepug/nicetime'

  export default {
    components: {
      navbarView,
      toastView,
      Cells,
      LinkCell,
      Dialog
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
              val.date = nicetime({date: r.createdAt}).get('M-d H:i')
              return val
            }
          }
        }).reverse()
      }
    },
    data () {
      return {
        dialogShow: false,
        dialogIndex: null,
        toastText: ''
      }
    },
    methods: {
      historyBack,
      openDialog (index) {
        this.dialogShow = true
        this.dialogIndex = index
      },
      dialogConfirm () {
        var index = this.dialogIndex
        return AV.Cloud.run('doubles', {
          method: 'accept',
          inviterObjId: this.list[index].inviterObjId
        }).then(ret => {
          console.log(ret)
          this.toastText = '组队成功'
          this.dialogShow = false
        }).catch(err => console.log(err))
      },
      dialogCancel () {
        this.dialogShow = false
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
