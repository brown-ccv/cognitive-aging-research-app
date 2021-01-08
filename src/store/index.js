import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/store/modules/firebase'
import login from '@/store/modules/login'
import register from '@/store/modules/register'

import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    ...vuexfireMutations,
    SET_USER_PROFILE(state, payload) {
      state.userProfile = payload
      localStorage.setItem('userProfile', JSON.stringify(payload))
    }
  },
  state: {
    userProfile: null
  },
  actions: {},
  modules: {
    firebase,
    login,
    register
  }
})
