import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/private/Dashboard.vue'
import Edit from '@/views/private/Edit.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Studies from '@/views/private/Studies.vue'
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
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, title: 'Dashboard' }
  },
  {
    path: '/participants',
    name: 'participants',
    component: Participants,
    meta: { requiresAuth: true, title: 'Participants' },
    query: {
      start_year: '',
      end_year: '',
      study: '',
      study_year: '',
      name: ''
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true, title: 'Update Participant' }
  },
  {
    path: '/studies',
    name: 'studies',
    component: Studies,
    meta: { requiresAuth: true, title: 'Add New Study' }
  },
  {
    path: '/update_study/:id',
    name: 'update_study',
    component: UpdateStudy,
    meta: { requiresAuth: true, title: 'Update Study' }
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
