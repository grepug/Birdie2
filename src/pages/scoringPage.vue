<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;")
          i.fa.fa-arrow-left
      .center 计分器
      .right
        a.link(href="javascript:;") 更多
    main
      versus-view(:teams="teams", :points="points")
      sortable-lists-view(:list="toolList")
    toast-view

</template>

<script>
  import {
    navbarView,
    toastView,
    versusView,
    sortableListsView
  } from '../components'
  import sortable from '../js/sortable'

  export default {
    components: {
      navbarView,
      toastView,
      versusView,
      sortableListsView
    },
    vuex: {
      getters: {

      },
      actions: {

      }
    },
    data () {
      return {
        toolList: {
          clock: {
            title: '时钟',
            after: 'abc'
          },
          discipline: {
            title: '比赛项目',
            after: '男子单打'
          },
          bestOf: {
            title: '局数',
            after: '三局两胜'
          },
          scoringSys: {
            title: '得分制',
            after: '21分制'
          }
        }
      }
    },
    computed: {
      teams () {
        return [
          [
            {
              headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEK3OiaEFu3GUzEJsVuBECq3Sl5GPXNBakIQ5yN6po3GP98n2osawuw7SCeQibwJwSB4lU99kssS8gSQ/0',
              sex: 1,
              nickname: 'sk'
            },
            {
              headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEK3OiaEFu3GUzEJsVuBECq3Sl5GPXNBakIQ5yN6po3GP98n2osawuw7SCeQibwJwSB4lU99kssS8gSQ/0',
              sex: 1,
              nickname: 'sk'
            }
          ],
          [
            {
              headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEK3OiaEFu3GUzEJsVuBECq3Sl5GPXNBakIQ5yN6po3GP98n2osawuw7SCeQibwJwSB4lU99kssS8gSQ/0',
              sex: 1,
              nickname: 'sk'
            },
            {
              headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEK3OiaEFu3GUzEJsVuBECq3Sl5GPXNBakIQ5yN6po3GP98n2osawuw7SCeQibwJwSB4lU99kssS8gSQ/0',
              sex: 2,
              nickname: 'sk'
            }
          ]
        ]
      },
      points () {
        return [11, 12]
      }
    },
    ready () {
      sortable.sortableToggle()
    }
  }
</script>

<style lang="less">

</style>
