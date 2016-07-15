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
    '/login/setUserInfo': {
      component: view('./pages/setUserInfo')
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
    '/tournaments/details/orders': {
      component: view('./pages/orders')
    },
    '/createTournament': {
      component: view('./pages/createTournament')
    },
    '/user': {
      component: view('./pages/user')
    },
    '/user/userInfo': {
      component: view('./pages/user/userInfo')
    },
    '/user/settings': {
      component: view('./pages/settings')
    },
    '/user/doubles': {
      component: view('./pages/doubles')
    },
    '/user/doubles/createDoubles': {
      component: view('./pages/createDoubles')
    },
    '/notification': {
      component: view('./pages/notification')
    },
    '/notification/details': {
      component: view('./pages/notificationDetails')
    },
    '/umpire': {
      component: view('./pages/umpire/umpire')
    },
    '/umpire/subTournament': {
      component: view('./pages/umpire/subTournament')
    },
    '/bracket': {
      component: view('./components/bracket')
    }
  })

  router.beforeEach(function (transition) {
    console.log(transition)
    var userObj = AV.User.current()
    store.dispatch('SET_TRANSITION', transition)
    if (!userObj) {
      if (transition.to.path.indexOf('/login') === -1) {
        transition.redirect({
          path: '/login',
          query: {}
        })
      }
    } else {
      store.dispatch('USERLOGED')
      store.dispatch('SET_USEROBJ', AV.User.current().toJSON())
      if (!userObj.get('nickname')) {
        if (transition.to.path.indexOf('/login') === -1) {
          transition.redirect('/login/setUserInfo')
        }
      } else {
        if (transition.to.path === '/login') {
          transition.redirect('/')
        }
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
