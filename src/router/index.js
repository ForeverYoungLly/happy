import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index'
import result from '@/views/result'
import resume from '@/views/resume'
import feedback from '@/views/feedback'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: index },
    { path: '/result', component: result },
    { path: '/resume', component: resume },
    { path: '/feedback', component: feedback }

  ]
})

export default router
