import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Dashboard from '@/views/private/Dashboard.vue'
import Edit from '@/views/private/Edit.vue'
import Studies from '@/views/private/Studies.vue'
import UpdateStudy from '@/views/private/UpdateStudy.vue'
import Participants from '@/views/private/Participants.vue'
import firebase from 'firebase'
import jsonwebtoken from 'jsonwebtoken'
import Keycloak from 'keycloak-js'

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

import store from '@/store/index'

router.beforeEach((to, from, next) => {
  document.title =
    `${to.meta.title} | Cognitive Research at Brown` ||
    'Cognitive Research at Brown'
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authenticated = store.state.userProfile

  if (authenticated) {
    next()
  }

  if (requiresAuth && !authenticated) {
    let initOptions = {
      url: 'https://datasci.brown.edu/keycloak/auth',
      realm: 'ccv-shib',
      clientId: 'nassar-app-test'
    }

    let keycloak = Keycloak(initOptions)
    keycloak
      .init({ onLoad: 'login-required' })
      .then(authenticated => { // eslint-disable-line
        let firebaseToken = keycloak.tokenParsed
        firebaseToken.iss = keycloak.idTokenParsed.sae
        firebaseToken.sub = keycloak.idTokenParsed.sae
        firebaseToken.aud =
          'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit'
        const token = jsonwebtoken.sign(
          firebaseToken,
          atob(keycloak.idTokenParsed.key),
          {
            algorithm: 'RS256'
          }
        )
        firebase
          .auth()
          .signInWithCustomToken(token)
          .catch(function(error) {
            throw error
          })
        // keycloak.loadUserInfo().success(info => {})
        keycloak
          .loadUserProfile()
          .then(profile => {
            store.dispatch('login/keyCloakAuthenticate', {
              ...profile
            })
          })
          .catch(err => {
            throw err
          })
        next()
      })
      .catch(err => {
        throw err
      })
  } else {
    next()
  }
})

export default router
