import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/private/Dashboard.vue'
import Edit from '@/views/private/Edit.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NewStudy from '@/views/private/NewStudy.vue'
import UpdateStudy from '@/views/private/UpdateStudy.vue'
import Participants from '@/views/private/Participants.vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/participants',
    name: 'participants',
    component: Participants,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: '/new_study',
    name: 'new_study',
    component: NewStudy,
    meta: { requiresAuth: true }
  },
  {
    path: '/update_study/:id',
    name: 'update_study',
    component: UpdateStudy,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title =
    `${to.meta.title} | Cognitive Research at Brown` ||
    'Cognitive Research at Brown'
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
