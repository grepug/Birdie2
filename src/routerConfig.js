import AV from './js/AV'
import store from './vuex/store'

export default function (router) {
  router.map({
    '/': {
      component: require('./App')
    },
    '/login': {
      component: require('./pages/login')
    },
    '/newMatch': {
      component: require('./pages/newMatch')
    },
    '/scoringPage': {
      component: require('./pages/scoringPage')
    },
    '/friends': {
      component: require('./pages/Friends')
    }
  })

  router.beforeEach(function (transition) {
    if (!AV.User.current()) {
      if (transition.to.path !== '/login') {
        transition.redirect('/login')
      }
    } else {
      store.dispatch('USERLOGED')
      store.dispatch('SET_USEROBJ', AV.User.current())
      if (transition.to.path === '/login') {
        transition.redirect('/')
      }
    }

    if (transition.to.path === '/scoringPage') {
      if (store.state.general.state !== 'matchUmpiring') {
        transition.abort()
      }
    }

    transition.next()
  })
}
