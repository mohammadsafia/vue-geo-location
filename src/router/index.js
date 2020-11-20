import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: () => import('@/components/home/GMap')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/components/auth/Signup')
    }
  ]
})
