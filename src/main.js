import Vue from 'vue'
import App from './App.vue'
import store from './store';
import ElementUI from 'element-ui';
import request from './utils/request';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  request,
  router,
  store,
}).$mount('#app')
