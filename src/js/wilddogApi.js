const host = `https://birdie2.wilddogio.com`

export default {

  getInvitees (roomId) {
    var url = `${host}/matchRoom/${roomId}/invitees.json`
    return fetch(url).then(res => res.json())
  },

  getMatchRoomMembers (roomId) {
    var url = `${host}/matchRoom/${roomId}/members.json`
    return fetch(url).then(res => res.json())
  },

  joinRoom (roomId, userObjId) {
    this.getMatchRoomMembers(roomId)
    .then(members => {
      var url = `${host}/matchRoom/${roomId}/members.json`
      if (members.indexOf(userObjId) === -1) {
        members.push(userObjId)
        return fetch(url, {
          method: 'PUT',
          body: JSON.stringify(members)
        })
      }
    })
  },

  setMatchState (roomId, state) {
    const url = `${host}/matchRoom/${roomId}/state.json`
    return fetch(url, {
      method: 'PUT',
      body: state
    }).then(res => res.json())
  }


}
