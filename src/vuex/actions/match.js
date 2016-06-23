import AV from '../../js/AV'

export const create = ({dispatch, state}) => {
  return AV.Cloud.run('match', {
    method: 'create'
    // teams: state
  })
}

export const changeTeams = ({dispatch, state}, teams) => {
  var _t = teams.filter(el => el).map(el => el.title)
  var _tLen = _t.length
  var t, u
  if (_tLen <= 1) {
    t = _t
  } else if (_tLen === 2) {
    t = [[_t[0]], [_t[1]]]
  } else if (_tLen === 3) {
    t = [[_t[0]], [_t[1]]]
    u = [_t[2]]
  } else if (_tLen === 4) {
    t = [[_t[0], _t[1]], [_t[2], _t[3]]]
  } else if (_tLen === 5) {
    t = [[_t[0], _t[1]], [_t[2], _t[3]]]
    u = [_t[4]]
  }
  dispatch('CHANGE_TEAMS', {t, u, d})
  return
}
