import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/store/modules/firebase'
import login from '@/store/modules/login'
import logout from '@/store/modules/logout'
import register from '@/store/modules/register'

import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    ...vuexfireMutations,
    SET_LOGGED_IN(state, payload) {
      state.loggedIn = true
      state.user = payload.user.email
      localStorage.setItem('userEmail', payload.email)
    },
    SET_LOGGED_STATUS(state, user) {
      state.loggedIn = !!user
    },
    SET_USER_STATE(state, payload) {
      state.user = payload.email
      localStorage.setItem('userEmail', payload.email)
    },
    SET_ERROR(state, error) {
      state.error = error.message
    }
  },
  state: {
    accessToken: null,
    loggedIn: false,
    user: null,
    error: null
  },
  actions: {},
  modules: {
    firebase,
    login,
    logout,
    register
  }
})
