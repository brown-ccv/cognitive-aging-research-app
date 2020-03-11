import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    participants: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindParticipants: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('participants', db.collection('participants'))
    }),
    createParticipant: firestoreAction((context, data) => {
      // return the promise so we can await the write
      return db.collection('participants').add({
        name: data.name,
        age: data.age,
        phone: data.phone
      })
    })
  },
  modules: {}
})
