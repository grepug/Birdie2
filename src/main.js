import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import routerConfig from './routerConfig'
import fastclick from 'fastclick'
// import Mint from 'mint-ui'
import store from './vuex/store'
import VueValidator from 'vue-validator'
// import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueTouch)
Vue.use(VueValidator)
// Vue.use(Mint)
// Vue.use(VueResource)

fastclick.attach(document.body)

// create router
var router = new Router({
})

routerConfig(router)

router.start(Vue.extend({store}), '#app')
