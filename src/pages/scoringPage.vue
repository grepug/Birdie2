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
  import clock from '../js/Clock'

  export default {
    components: {
      navbarView,
      toastView,
      versusView,
      sortableListsView
    },
    vuex: {
      getters: {
        matchClock: ({match}) => match.matchClock
      },
      actions: {
        clockTicking: ({dispatch}, cl, dur) => dispatch('CHANGE_MATCH_DURATION', cl, dur)
      }
    },
    data () {
      return {
      }
    },
    computed: {
      toolList () {
        return {
          clock: {
            title: '时钟',
            after: this.matchClock
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
      },
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
      // clock.init(this.clockTicking)
      clock.init((cl) => {
        this.clockTicking(cl, clock.duration)
      })
    }
  }
</script>

<style lang="less">

</style>
