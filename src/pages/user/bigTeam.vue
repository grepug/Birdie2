<template lang="jade">
  div
    navbar-view
      .left
        a.link(href="javascript:;", @click="historyBack") 返回
      .center 团队
      .right
        a.link(v-link="{path: '/user/bigTeam/create'}") 创建
    main
      panel(access="", v-for="el in myBigTeams")
        panel-header cba
        panel-body
          media-box(type="text")
            media-body
              media-title {{el.name}}
              media-description
                p 领队 {{el.creator}}
                p 男单 {{el.players.ms || '无'}}
                p 女单 {{el.players.ws || '无'}}
                p 男双 {{el.players.md || '无'}}
                p 女双 {{el.players.wd || '无'}}
                p 混双 {{el.players.xd || '无'}}
        panel-footer abc
</template>

<script>
  import {
    navbarView
  } from '../../components'
  import {
    Panel, PanelHeader, PanelBody, PanelFooter,
    MediaBox, MediaBody, MediaTitle, MediaDescription
  } from 'vue-weui'
  import AV from '../../js/AV'
  import {historyBack, isSingle} from '../../js/utils'
  import {getUserObj, getDoublesObj} from '../../js/methods'
  import {addOthersUserObj, addDoubles} from '../../vuex/actions/user'
  import _ from 'lodash'

  export default {
    components: {
      navbarView,
      Panel, PanelHeader, PanelBody, PanelFooter,
      MediaBox, MediaBody, MediaTitle, MediaDescription
    },
    route: {
      data () {
        return AV.Cloud.run('bigTeams', {
          method: 'getMyBigTeams'
        }).then(ret => {
          this.bigTeams = ret
          var promises = ret.map(el => {
            return _.map(el.players, (v, k) => {
              if (isSingle(k)) return this.addOthersUserObj(v.map(el => el.objectId))
              return this.addDoubles(v.map(el => el.objectId)).then(ret => this.addOthersUserObj(ret))
            }).concat(this.addOthersUserObj(el.creator.objectId))
          })
          return Promise.all(_.flattenDeep(promises))
        })
      }
    },
    vuex: {
      getters: {

      },
      actions: {
        addOthersUserObj,
        addDoubles
      }
    },
    computed: {
      myBigTeams () {
        if (!this.bigTeams || !this.bigTeams.length) return []
        return this.bigTeams.map(el => {
          console.log(el)
          return {
            players: {
              ms: el.players.ms.map(el => this.getUserObj(el.objectId)[0].nickname).join(' '),
              ws: el.players.ws.map(el => this.getUserObj(el.objectId)[0].nickname).join(' '),
              md: el.players.md.map(el => this.getDoublesObj(el.objectId)[0].players.map(el => this.getUserObj(el)[0].nickname).join('/')).join(' '),
              wd: el.players.wd.map(el => this.getDoublesObj(el.objectId)[0].players.map(el => this.getUserObj(el)[0].nickname).join('/')).join(' '),
              xd: el.players.xd.map(el => this.getDoublesObj(el.objectId)[0].players.map(el => this.getUserObj(el)[0].nickname).join('/')).join(' ')
            },
            name: el.name,
            creator: this.getUserObj(el.creator.objectId)[0].nickname
          }
        })
      }
    },
    data () {
      return {
        bigTeams: []
      }
    },
    methods: {
      historyBack,
      getUserObj,
      getDoublesObj
    },
    ready () {
      window.vm = this
    }
  }
</script>
