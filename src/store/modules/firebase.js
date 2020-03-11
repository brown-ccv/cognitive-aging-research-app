import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

export default {
  namespaced: true,
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
  }
}
