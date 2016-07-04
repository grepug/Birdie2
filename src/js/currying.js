const currying = function (func) {

  var len = func.length

  var getCurry = function (params) {

    var next = params.concat(Array.prototype.slice.call(arguments))

    if (len - next.length <= 0) {
      return func.apply(this, next)
    }

    return getCurry(next)
  }

  return getCurry([])

}

export default currying
