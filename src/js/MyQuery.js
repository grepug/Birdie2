import _ from 'underscore'

window.S = document.querySelectorAll

export default $

function $ (sel) {
  return new MyQuery(sel)
}

class MyQuery {

  constructor (el) {
    if (typeof el === 'string' && el.indexOf('<') === -1) {
      this.$el = _.map(document.querySelectorAll(el), x => x)
    } else if (typeof el === 'string' && el.indexOf('<') !== -1) {
      this.$el = [createEl(el)]
    } else if (el.toString().indexOf('Element]') !== -1) {
      this.$el = [el]
    }
    this.length = this.$el.length
  }

  get (index) {
    if (isNaN(index)) return this.$el
    return this.$el[index]
  }

  on (eventType, cb) {
    for (var i = 0; i < this.$el.length; i++) {
      this.$el[i].addEventListener(eventType, cb.bind(this.$el[i], i))
    }
    return this
  }

  addClass (className) {
    for (var i = 0; i < this.$el.length; i++) {
      var c = this.$el[i].className
      this.$el[i].className = c + ' ' + className
    }
    return this
  }

  attr (attr, val) {
    if (val !== undefined) {
      for (var i = 0, len = this.$el.length; i < len; i++) {
        this.$el[i].setAttribute(attr, val)
      }
      return this
    }
    return this.$el[0].getAttribute(attr)
  }

  data (name) {
    return this.attr('data-' + name)
  }

  removeClass (className) {
    for (var i = 0; i < this.$el.length; i++) {
      var c = this.$el[i].className.split(' ')
      var index  = c.indexOf(className)
      if (index !== -1) {
        c.splice(index, 1)
        c.join(' ')
        this.$el[i].className = c
      }
      return this
    }
  }

  hasClass (className) {
    for (var i = 0; i < this.$el.length; i++) {
      var c = this.$el[i].className.split(' ')
      if (c.indexOf(className) !== -1) return true
      return false
    }
  }

  html (html) {
    if (html) {
      this.$el[0].innerHTML = html
      return this
    }
    return this.$el[0].innerHTML
  }

  each (cb) {
    for (var i = 0; i < this.$el.length; i++) {
      var ret = cb.bind(this.$el[i])(this.$el[i], i)
      if (ret === false) return
    }
  }

  map (cb) {
    var arr = []
    for (var i = 0; i < this.$el.length; i++) {
      var ret = cb.bind(this.$el[i])(i, this.$el[i])
      if (ret === false) return
      arr.push(ret)
    }
    return arr
  }

  text (text) {
    if (text) {
      this.$el[0].innerText = text
      return this
    }
    return this.$el[0].innerText
  }

  css (name, val) {
    var caseType = function (name) {
      if (name.indexOf('-') === -1) return name
      return name.split('-').map(function (el, i) {
        if (i) {
          return el[0].toUpperCase() + el.slice(1)
        }
        return el
      })
    }
    for (var i = 0; i < this.$el.length; i++) {
      if (val) {
        this.$el[i].style[caseType(name)] = val
      } else {
        return this.$el[i].style[caseType(name)]
      }
    }
    return this
  }

  show () {
    this.css('display', 'block')
    return this
  }

  hide () {
    this.css('display', 'none')
    return this
  }

  offset () {

  }

  find (sel) {
    var arr = []
    var $el = this.map(function (el, index) {
      return el.querySelectorAll(sel)
    })
    for (var i = 0; i < $el.length; i++) {
      for (var j = 0; j < $el[i].length; j++) {
        arr = arr.concat($el[i][j])
      }
    }
    this.$el = arr
    return this
  }

  parent () {
    this.$el = this.$el.map((el) => {
      return el.parentNode
    }).filter(el => el)
    return this
  }

  parents (sel) {
    var parentsNode = S(sel)
    this.$el = this.$el.map((el, i) => {
      el = el.parentNode
      while (parentsNode.indexOf(el) === -1) {
        if (!el) break
        if (!el.parentNode.tagName) break
        if (el.parentNode.tagName.toLowerCase() === 'html') break
        el = el.parentNode
      }
      return el
    }).filter(el => el)
    return this
  }

  prev () {
    this.$el = this.$el.map(function (el) {
      return el.previousSibling
    }).filter(el => el)
    return this
  }

  next () {
    this.$el = this.$el.map(function (el) {
      return el.nextSibling
    }).filter(el => el)
    return this
  }

  siblings (sel) {
    this.$el = this.$el.map(function (el) {

    })
  }

}

function createEl (html) {
  var container = document.createElement('div')
  container.innerHTML = html
  return container.firstChild
}

function parseSel (sel) {
  var selArr = sel.split(',').map(function (el) {
    return el.split(' ').filter(el2 => el2)
  })
  return selArr
}
