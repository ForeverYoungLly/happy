import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index'
import result from '@/views/result'
import resume from '@/views/resume'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: index },
    { path: '/index', component: index },
    { path: '/result', component: result },
    { path: '/resume', component: resume }
  ]
})

export default router
