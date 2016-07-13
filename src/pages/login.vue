<template lang="jade">
  div
    login-view(@on-getvalicode="getValiCode", @on-login="login", :phone.sync="phone", :valicode.sync="valicode")
</template>

<script>
  import loginView from '../components/login'
  import AV from '../js/AV'
  import vali from '../js/validate'
  import cookie from 'js-cookie'

  export default {
    components: {
      loginView
    },
    vuex: {
      getters: {
        transition: ({route}) => route.transition
      },
      actions: {
      }
    },
    data () {
      return {
        phone: '',
        valicode: ''
      }
    },
    methods: {
      getValiCode () {
        if (!vali().phone(this.phone)) return console.log('手机号格式不对')
        AV.Cloud.requestSmsCode(this.phone).then(function (ret) {
          console.log('验证码发送成功')
        }).catch(function (err) {
          console.log(err)
        })
      },
      login (method) {
        switch (method) {
          case 'wx':
            break
          default:
            // if (!vali().phone(this.phone)) return console.log('手机号格式不对')
            // if (!vali().veriCode(this.valicode)) return console.log('验证码格式不对')
            // AV.User.signUpOrlogInWithMobilePhone(this.phone, this.valicode).then(function (ret) {
            //   console.log('登录成功')
            // }).catch(function (err) {
            //   console.log(err)
            // })
            const go = () => {
              if (this.transition.to.path.indexOf('login') === -1) {
                this.$router.go({
                  path: this.transition.to.path
                })
              } else {
                this.$router.go({
                  path: '/'
                })
              }
            }
            AV.User.logInWithMobilePhone(this.phone, this.valicode).then((ret) => {
              var cookieInfo = cookie.get('wx_userinfo')
              if (cookieInfo) {
                console.log(this.transition)
                var userinfo = JSON.parse(cookie.get('wx_userinfo').slice(2))
                return ret.save({
                  openid: userinfo.openid,
                  nickname: userinfo.nickname,
                  headimgurl: userinfo.headimgurl,
                  sex: userinfo.sex
                }).then(() => go())
              } else {
                go()
              }
            }).catch(function (err) {
              console.log(err)
            })
            break
        }
      }
    }
  }

</script>
