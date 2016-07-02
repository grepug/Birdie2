import AV from './js/AV'
import store from './vuex/store'

export default function (router) {
  router.map({
    '/': {
      component: view('./App')
    },
    '/login': {
      component: view('./pages/login')
    },
    '/newMatch': {
      component: view('./pages/newMatch')
    },
    '/scoringPage': {
      component: view('./pages/scoringPage')
    },
    '/friends': {
      component: view('./pages/friends')
    },
    '/matchResults': {
      component: view('./pages/matchResults')
    },
    '/tournaments': {
      component: view('./pages/tournaments')
    },
    '/tournaments/details': {
      component: view('./pages/tournamentDetails')
    },
    '/createTournament': {
      component: view('./pages/createTournament')
    },
    '/bracket': {
      component: view('./components/bracket')
    }
  })

  router.beforeEach(function (transition) {
    if (!AV.User.current()) {
      if (transition.to.path !== '/login') {
        transition.redirect('/login')
      }
    } else {
      store.dispatch('USERLOGED')
      store.dispatch('SET_USEROBJ', AV.User.current().toJSON())
      if (transition.to.path === '/login') {
        transition.redirect('/')
      }
    }

    if (transition.to.path === '/scoringPage') {
      // if (store.state.general.state !== 'matchUmpiring') {
      //   transition.abort()
      // }
    }

    transition.next()
  })
}

function view(path) {
  return function(resolve) {
    require([path], resolve);
  }
}
