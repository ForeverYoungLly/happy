//创建路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import myMain from '../views/myMain.vue'
Vue.use(VueRouter)

//将路由与组件进行映射
const routes = [
  //配置主路由
  {
    path: '/',
    component:myMain,
    children:[
    //配置子路由
      // { path: 'home', component: myHome},
      // { path: 'user', component: myUser}
    ]
  }
]

//创建router实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router
