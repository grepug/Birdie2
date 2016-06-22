import AV from '../js/AV'

export const getAllUsers = function ({ dispatch, state }) {
  return AV.Cloud.run('user', {
    method: 'all'
  }).then((ret) => {
    this.list = ret
    console.log(ret)
  }).catch(function (err) {
    console.log(err)
  })
}
