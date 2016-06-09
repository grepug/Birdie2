const express = require('express')
const app = express()
const _ = require('underscore')
require('./app/cloudFuncs/user')
// const bodyParser = require('body-parser')

app.use(express.static('./dist'))

// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json())

// app.get('/[a-z]+.json', (req, res) => {
//   const param = req.query
//   const path = req.path
//   const method = param.action
//   get({
//     service: path,
//     method: method,
//     body: param
//   }, res)
// })
//
// app.post('/[a-z]+.json', (req, res) => {
//   const param = req.body
//   const path = req.path
//   const method = req.query.action
//   get({
//     service: path,
//     method: method,
//     body: param
//   }, res)
// })
//
// function get (arg, res) {
//   const url = `http://app.service.yuetur.com${arg.service}?action=${arg.method}`
//   request({
//     method: 'POST',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       appKey: 'yuetur',
//       token: '123456789'
//     },
//     url: url,
//     body: bodyStr(arg.body)
//   }, function(e, r, body) {
//     res.send(body)
//   })
// }
//
// function bodyStr (param) {
//   var formstr = ''
//   _.each(param, function(key, parm) {
//     if (key) {
//       if (typeof key !== 'string')
//         key = JSON.stringify(key)
//       key = key.replace('undefined', '')
//       formstr += parm + '=' + key + '&'
//     }
//   })
//   return formstr
// }

app.listen(process.env.PORT || 5050)
