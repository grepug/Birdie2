import AV from 'avoscloud-sdk'

const config = {
  appid: 'SXHKYLU066nSzpRhnqNoLK7v-gzGzoHsz',
  appsecret: '2opqk8qfC8OIOJs8A6dBpNUL'
}

AV.initialize(config.appid, config.appsecret)

window.AV = AV

AV.serverURL = 'http://192.168.0.100:3000'

console.log(AV)

export default AV
