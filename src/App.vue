<template lang="jade">
  div
    navbar-view
      .left
        a(href="javascript:;")
      .center Birdie
      .right
        a.link(href="javascript:;")
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
            a(v-link="{path: '/tournaments'}") 赛事
          div
            a(v-link="{path: '/umpire'}") 裁判
          div
            a(v-link="{path: '/notification'}") 通知中心
        .row
          div
            a(v-link="{path: '/user/doubles'}") 双打队伍
          div
            a(v-link="{path: '/user'}") 用户中心
          div
            a(v-link="{path: '/user/bigTeam'}") 用户中心
</template>

<script>
import navbarView from './components/navbar'
import swiperView from './components/swiper'
import 'font-awesome-webpack'
import {Actionsheet} from 'vue-weui'

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
  * {
    user-select: none;
  }
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
