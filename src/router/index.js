import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/firebase/init'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: () => import('@/components/home/GMap'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/components/auth/Signup')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/auth/Login')
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: () => import('@/components/profile/ViewProfile'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
