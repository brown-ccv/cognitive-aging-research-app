import { firestoreAction } from 'vuexfire'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    participants: []
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
        yob: data.yob,
        phone: data.phone,
        email: data.email,
        contact_preference: data.contact_preference
      })
    })
  }
}
