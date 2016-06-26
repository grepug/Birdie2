<template lang="jade">
  div
    section
      .team.team1
        .team-head
          img(v-for="el in teams[0]", :src="el.headimgurl", :style="{borderColor: el.sex === 1 ? 'blue' : 'red'}")
        .name(v-text="name1")
        .point(v-text="points[0]")
        .button
          a.button(href="javascript:;", @click="addPoint(0)", :class="{active: buttonActive === 0}") +
      .divider
        .vs VS.
        div :
      .team.team2
        .team-head
          img(v-for="el in teams[1]", :src="el.headimgurl", :style="{borderColor: el.sex === 1 ? 'blue' : 'red'}")
        .name(v-text="name2")
        .point(v-text="points[1]")
        .button
          a.button(href="javascript:;", @click="addPoint(1)", :class="{active: buttonActive === 1}") +
</template>

<script>
  export default {
    props: {
      teams: {
        type: Array,
        default: []
      },
      points: {
        default: []
      },
      scoredTeam: {
        type: Number
      },
      sideExchanged: {
        type: Boolean
      }
    },
    computed: {
      name1 () {
        return this.teams[0].map(el => {
          return el.nickname
        }).join(' / ')
      },
      name2 () {
        return this.teams[1].map(el => {
          return el.nickname
        }).join(' / ')
      },
      buttonActive () {
        var index = this.scoredTeam
        if (this.sideExchanged) index = index === 0 ? 1 : 0
        return index
      }
    },
    methods: {
      addPoint (index) {
        this.$dispatch('on-add-point', index)
      }
    }
  }

</script>

<style lang="less" scoped>
  section {
    width: 100%;
    > div {
      display: inline-block;
      text-align: center;
    }
    .divider {
      color: red;
      font-size: 1.5rem;
      line-height: 3rem;
      width: 10%;
      position: relative;
      bottom: 3rem;
      .vs {
        margin-bottom: 1rem;
      }
    }
    .team {
      width: 45%;
      // position: relative;
      // right: 0.2rem;
      .team-head {
        position: relative;
        img {
          width: 4rem;
          border-radius: 50%;
          border: 2px solid transparent;
          // &:nth-child(2) {
          //   position: absolute;
          //   right: 0.2rem;
          // }
        }
      }
      .point {
        color: red;
        font-size: 2.5rem;
      }
      .button {
        a {
          display: block;
          border: 1px solid;
          width: 80%;
          padding-top: 0.3rem;
          padding-bottom: 0.3rem;
          margin: 0 auto;
        }
        a.active {
          background-color: red;
        }
      }
    }
  }
</style>
