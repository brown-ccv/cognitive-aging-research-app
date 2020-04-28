import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/private/Dashboard.vue'
import Edit from '@/views/private/Edit.vue'
import Home from '@/views/Home.vue'
import Enroll from '@/views/Enroll.vue'
import NewStudy from '@/views/private/NewStudy.vue'
import UpdateStudy from '@/views/private/UpdateStudy.vue'
import Participants from '@/views/private/Participants.vue'

import Keycloak from 'keycloak-js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/enroll',
    name: 'enroll',
    component: Enroll
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
    path: '/edit/:participantId',
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
    path: '/update_study/:studyId',
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

import store from '@/store/index'

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authenticated = store.state.userProfile

  if (authenticated) {
    next()
  }

  if (requiresAuth && !authenticated) {
    let initOptions = {
      url: 'https://datasci.brown.edu/keycloak/auth',
      realm: 'ccvpubs',
      clientId: 'nassar-app-test'
    }

    let keycloak = Keycloak(initOptions)
    keycloak
      .init({ onLoad: 'login-required' })
      .success(authenticated => {
        console.log('authenticated:' + authenticated)
        keycloak
          .loadUserProfile()
          .success(profile => {
            store.dispatch('login/keyCloakAuthenticate', profile)
          })
          .error(err => console.log(err))
        next()
      })
      .error(err => console.log(err))
  } else {
    next()
  }
})

export default router
