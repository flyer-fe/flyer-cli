// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from 'components/loading'
Vue.use(Loading)

// 初始化产品线和权限的数据
// let initData = () => {
//   return {}
// }

// 初始化视口
// let initView = () => {
//   return new Promise((resolve, reject) => {
//     resolve()
//   })
// }

// 登录一下
let login = () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

/* eslint-disable no-new */
login()
  .then(() => {
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  })
