import Vue from 'vue'
import App from './App.vue'
import store from './store';
import ElementUI from 'element-ui';
import request from './utils/request';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import * as echarts from "echarts";
import axios from 'axios'
import VueAxios from 'vue-axios';
// 全局引入global
import global from "@/global/global.js"
// axios.defaults.baseURL = 'http://123.207.73.185:8080'
Vue.prototype.global = global
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  request,
  router,
  store,
}).$mount('#app')