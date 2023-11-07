import Vue from 'vue'
import App from './App.vue'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import '@/assets/css/base.css'
// import echarts from "echarts";
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;
// Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
