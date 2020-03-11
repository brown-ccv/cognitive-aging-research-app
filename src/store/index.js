import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/store/modules/firebase'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    ...vuexfireMutations
  },
  actions: {},
  modules: {
    firebase
  }
})
