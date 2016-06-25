class Clock {
  constructor() {
    this.then = Date.now()
    this.duration = 0
  }

  init (cb) {
    this.clock = setInterval(() => {
      var sec, min, hour
      this.duration = (Date().now() - this.then) / 1000
      if (this.duration < 60) return cb('00:00:' + ('0' + Math.floor(this.duration)).slice(-2))
      if (this.duration / 60 < 60) {
        sec = ('0' + Math.floor(this.duration % 60)).slice(-2)
        min = ('0' + Math.floor(this.duration / 60)).slice(-2)
        return cb('00:' + min + ':' + sec)
      }
      if (this.duration / 60 >= 60) {
        sec = ('0' + Math.floor(this.duration % 60)).slice(-2)
        min = ('0' + Math.floor(this.duration / 60) % 60).slice(-2)
        hour = ('0' + '0' + Math.floor(this.duration / 60 / 60)).slice(-2)
        return cb(hour + ':' + min + ':' + sec)
      }
    }, 1000)
  }

  cancel () {
    clearInterval(this.clock)
    if (typeof cb === 'function') cb()
  }
}

export default new Clock()
