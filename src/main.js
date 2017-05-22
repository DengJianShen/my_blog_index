// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import './assets/css/reset.css'
import './assets/css/style.css'

Vue.use(VueResource)

const bus = new Vue()
Vue.prototype.$bus = bus

Vue.prototype.$home = "http://localhost:1234"

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
