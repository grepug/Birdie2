<template lang="jade">
  div
    navbar-view
      .left
        a(href="javascript:;")
      .center Birdie
      .right
        a.link(v-link="{path: '/friends'}")
          i.fa.fa-user
        a.link(href="javascript:;", v-touch:tap="openMenu")
          i.fa.fa-plus
    swiper-view
      .swiper-slide
        img(src="./assets/ex.jpg")
      .swiper-slide
        img(src="./assets/ex.jpg")
      .swiper-slide
        img(src="./assets/ex.jpg")
    main
      actionsheet(:actions="actions", :show.sync="actionSheetShow", :menus="menus", :title="title", @weui-menu-click="click", @weui-menu-cancel="cancel()")
        p 内容
        p hahah
      section.grid
        .row
          div
            a(v-link="{path: '/newMatch'}") 发起比赛
          div
            a(href="javascript:;") 比赛历史
          div
            a(href="javascript:;") 邀请历史
        .row
          div
            a(v-link="{path: '/friends'}") 附近球友
          div
            a(href="javascript:;") 啦啦啦
          div
            a(v-link="{path: '/user'}") 用户中心
</template>

<script>
import navbarView from './components/navbar'
import swiperView from './components/swiper'
import 'font-awesome-webpack'
import {Actionsheet} from 'vue-weui'

console.log(Actionsheet)
export default {
  components: {
    navbarView,
    swiperView,
    Actionsheet
  },
  data () {
    return {
      menus: {
        newMatch: '发起比赛'
      },
      actions: {
        action1: '取消'
      },
      actionSheetShow: false
    }
  },
  methods: {
    openMenu () {
      this.actionSheetShow = !this.actionSheetShow
    },
    click (name) {
      window.location = '#!/' + name
    }
  },
  ready () {
    return
  }
}
</script>

<style lang="less">
  .navbar {
  }
  .swiper-container {
    margin-top: 60px !important;
    .swiper-slide {
      img {
        width: 100%;
      }
    }
  }
  section.grid {
    .row {
      width: 100%;
      position: relative;
      line-height: 5rem;
      border-bottom: 1px solid #ccc;
      > div {
        display: inline-block;
        width: 33%;
        text-align: center;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: 0;
        }
        > a {
          display: block;
        }
      }
      &:first-child {
        border-top: 1px solid #ccc;
      }
      // &::after {
      //   content: '';
      //   position: absolute;
      //   bottom: 0;
      //   width: 100%;
      //   height: 1px;
      //   background-color: #000;
      //
      // }
    }
  }
</style>
