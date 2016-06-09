const AV = require('../libs/AV')

var func = {

  create (req) {
    var Match, match, order, team1, team2, umpire, scoringSys, discipline, numberOfGames
    order = req.params.order
    scoringSys = req.params.scoringSys
    discipline = req.params.discipline
    numberOfGames = req.params.numberOfGames
    team1 = order[0]
    team2 = order[1]
    umpire = order[2]
    Match = AV.Object.extend('Match')
    match = new Match
    return match.save({
      team1: team1,
      team2: team2,
      creator: req.user,
      scoringSys: scoringSys,
      discipline: discipline,
      numberOfGames: numberOfGames,
      umpire: umpire,
      status: 'playing'
    })
  }


}

AV.Cloud.define('match', function (req, res) {

  var promise
    if (!req.user) {
      promise = Promise.reject({
        msg: 'not loged in'
      })
    } else {
      promise = func[req.params.method](req)
    }
    return promise.then(function (ret) {
      res.success(ret)
    }).catch(function (err) {
      console.log(err)
      res.error(err)
    })

})
