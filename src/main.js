import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import routerConfig from './routerConfig'
import Mint from 'mint-ui'
import store from './vuex/store'

Vue.use(Router)
Vue.use(VueTouch)
Vue.use(Mint)

// create router
var router = new Router({
  // history: true,
  // saveScrollPosition: true
})

routerConfig(router)

router.start(Vue.extend({store}), '#app')
