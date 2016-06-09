<template lang="jade">
  NavbarView
    .left
      a.link(v-link="'/'")
        i.fa.fa-arrow-left
    .center 发起比赛
    .right
  main
    sortableview(:list="list", @on-sort="onSort")
    .team-indicator.team-1 队伍一
    .team-indicator.team-2 队伍二



</template>

<script>
  import navbarview from '../components/navbar'
  import sortableview from '../components/sortableLists'
  import $ from '../js/Dom7'
  import AV from '../js/AV'

  export default {
    components: {
      navbarview,
      sortableview
    },
    data () {
      return {
        list: [{
          title: 'grepug',
          after: 'M'
        }, {
          title: 'sk',
          after: 'M'
        }, {
          title: 'abcc',
          after: '123'
        }, {
          title: '123'
        }]
      }
    },
    methods: {
      onSort () {
        console.log(this.list)
      }
    },
    ready () {
      AV.Cloud.run('Hello').then((ret) => {
        console.log(ret)
      })
      var offset = $('.sortable ul li.team2-first').offset()
      $('.team-indicator.team-2').css('top', offset.top - 48 * 2 - 15 + 'px')
    }
  }

  // function ajust() {
  //   var $li = $('.sortable ul li')
  //   var groupNum = Math.ceil($li.length / 2)
  // }
</script>

<style lang="less">
  main {
    position: relative;
    .sortable {
      margin-top: 5.8rem;
      ul li {
        &:first-child {
          margin-top: 2rem;
        }
        &.team2-first {
          margin-top: 2rem;
        }
      }
    }
    .team-indicator {
      position: absolute;
      left: 1rem;
    }
    .team-1 {
      top: -2rem;
    }
    .team-2 {
      top: 55px;
    }
   }
</style>
