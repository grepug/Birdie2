import AV from './js/AV'

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
    'newMatch/invitePlayers/:cid': {
      component: require('./pages/invitePlayers')
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
      if (transition.to.path === '/login') {
        transition.redirect('/')
      }
    }
    transition.next()
  })
}
