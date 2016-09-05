<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="historyBack") 返回
      .center 创建团队
      .right
    main
      cells(type="form")
        input-cell(type="text", label="团队名", placeholder="请输入团队名", :value.sync="bigTeamName")
      .button-area
        weui-button(@click="create") 创建
      p 每个人只能创建1个团队，团队比赛报名需由创建者操作
</template>

<script>
  import {
    navbarView
  } from '../../components'
  import {
    Cells, InputCell,
    Toast,
    Button
  } from 'vue-weui'
  import {historyBack} from '../../js/utils'
  import AV from '../../js/AV'

  export default {
    components: {
      navbarView,
      Cells, InputCell,
      Toast,
      'weui-button': Button
    },
    data () {
      return {
        bigTeamName: ''
      }
    },
    methods: {
      historyBack,
      create () {
        return AV.Cloud.run('bigTeams', {
          method: 'create',
          name: this.bigTeamName
        }).then(ret => console.log(ret))
        .catch(err => console.log(err))
      }
    }
  }
</script>

<style lang="less">
  .button-area {
    margin-top: 2rem;
  }
</style>
