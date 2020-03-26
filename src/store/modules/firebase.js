import { firestoreAction } from 'vuexfire'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    participants: [],
    participant: ''
  },
  mutations: {
    SET_PARTICIPANT(state, payload) {
      state.participant = payload
    }
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
        contact_preference: data.contact_preference,
        sex_at_birth: data.sex_at_birth,
        preferred_time_of_contact: data.preferred_time_of_contact,
        study: data.study,
        attempted_contact_date: data.attempted_contact_date,
        contact_method: data.contact_method,
        participant_response: data.participant_response,
        participated_start_date: data.participated_start_date,
        participated_end_date: data.participated_end_date
      })
    }),
    setParticipant: ({ commit }, id) => {
      return db
        .collection('participants')
        .doc(id)
        .get()
        .then(snapshot => {
          const participant = snapshot.data()
          participant.id = id
          commit('SET_PARTICIPANT', participant)
        })
    },
    updateParticipant: firestoreAction((context, data) => {
      console.log(data)
      return db
        .collection('participants')
        .doc(data.id)
        .update({
          attempted_contact_date: data.attempted_contact_date
        })
        .then(() => {
          console.log('participant updated!')
        })
    })
  }
}
