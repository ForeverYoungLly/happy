//创建路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'

import userlist from '@/views/UserList'
import InfoPush from '@/views/InfoPush'
import LayOut from '@/views/LayOut'
import index from '@/views/Index'
Vue.use(VueRouter)

//将路由与组件进行映射
const routes = [
  //配置主路由
  {
    path: '/',
    component:LayOut,
    redirect:'/userlist',
    children:[
    //配置子路由
      { path: '/userlist', component: userlist},
      { path: '/infopush', component: InfoPush},
      { path:'/index',component:index}
    ]
  },
  {
    path:'/userlist',
    component:userlist
  },

]

//创建router实例
const router = new VueRouter({
    routes 
})

export default router
