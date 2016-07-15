<template lang="jade">
  div
    navbar-view
      .left
      .center 用户信息
      .right
        a.link(href="javascript:;", @click="save") 保存
    main
      cells(type="form")
        input-cell(type="text", label="用户名", placeholder="推荐使用真实姓名", :value.sync="nickname")
        select-cell(:after="true", :options="sexOptions", :selected.sync="sexSelected", v-if="userObj.sex !== 1 && userObj.sex !== 2")
          span(slot="header") 性别
        input-cell(type="date", label="生日", :value.sync="birthday")
</template>

<script>
  import {
    Cells,
    InputCell,
    SelectCell
  } from 'vue-weui'
  import {
    navbarView
  } from '../components'
  import {trim} from '../js/utils'
  import AV from '../js/AV'
  import nicetime from '@grepug/nicetime'

  export default {
    components: {
      Cells,
      InputCell,
      SelectCell,
      navbarView
    },
    vuex: {
      getters: {
        transition: ({route}) => route.transition,
        userObj: ({user}) => user.userObj
      }
    },
    data () {
      return {
        nickname: '',
        sexOptions: [{text: '请选择', value: '0'}, {text: '男', value: '1'}, {text: '女', value: '2'}],
        sexSelected: '0',
        birthday: this.userObj.birthday ? nicetime({date: this.userObj.birthday.iso}).get('Y-M-d') : ''
      }
    },
    methods: {
      save () {
        const go = () => {
          if (this.transition.to.path.indexOf('login') === -1) {
            this.$router.go({
              path: this.transition.to.path
            })
          } else {
            this.$router.go({
              path: '/'
            })
          }
        }

        return AV.User.current().save({
          nickname: trim(this.nickname),
          sex: this.sex === '0' ? this.userObj.sex : this.sex,
          birthday: new Date(this.birthday)
        }).then(() => go())
      }
    },
    ready () {
      window.vm = this
    }
  }
</script>

<style lang="less">
.weui_select_after .weui_select {
  padding-left: 15px;
}
</style>
