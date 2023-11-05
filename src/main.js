import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/assets/css/base.css'
import '@/assets/images/abbg01.png'
// import axios from 'axios'

// axios.defaults.baseURL = '/api'// 设置代理

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
