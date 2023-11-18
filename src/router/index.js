//创建路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import userlist from '@/views/UserList'
import InfoPush from '@/views/InfoPush'
import LayOut from '@/views/LayOut'
import index from '@/views/Index'
import setClient from '@/views/setClient'
import theLogin from '@/views/theLogin'
Vue.use(VueRouter)

//将路由与组件进行映射
const routes = [
  // 配置主登录路由
  { path: '/',component:theLogin, redirect: '/index'},
  //配置主路由
  { path: '/login',component: theLogin},
  {
    path: '/Layout',
    component:LayOut,
    //配置子路由
    children:[
      // 用户列表
      { path: '/userlist', component: userlist},
      // 消息推送
      { path: '/infopush', component: InfoPush},
      // 首页
      { path:'/index',component:index},
      //用户端配置
      { path:'/setClient',component:setClient},
    ]
  },


]

//创建router实例
const router = new VueRouter({
    routes 
})

export default router
