import { firestoreAction } from 'vuexfire'
import { db } from '@/db'

export default {
  namespaced: true,
  state: {
    participants: [],
    participant_studies: [],
    contact_attempts: [],
    studies: [],
    participant: {},
    study: {}
  },
  mutations: {
    SET_PARTICIPANT(state, payload) {
      state.participant = payload
    },
    SET_STUDY(state, payload) {
      state.study = payload
    }
  },
  actions: {
    // Participants actions
    bindParticipants: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('participants', db.collection('participants'))
    }),
    bindParticipantStudies: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef(
        'participant_studies',
        db
          .collection('participants')
          .doc(id)
          .collection('study_list')
      )
    }),
    addStudyToParticipant: firestoreAction((context, data) => {
      console.log(data)
      return db
        .collection('participants')
        .doc(data.participantId)
        .update({
          in_studies: data.inStudies
        })
    }),
    bindContactAttempts: firestoreAction(({ bindFirestoreRef }, ids) => {
      return bindFirestoreRef(
        'contact_attempts',
        db
          .collection('participants')
          .doc(ids.participant)
          .collection('study_list')
          .doc(ids.study)
          .collection('contact_attempts')
      )
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
        date_created: Date.now(),
        in_studies: [],
        last_contacted: ''
      })
    }),
    addLastAttempt: firestoreAction((context, data) => {
      return db
        .collection('participants')
        .doc(data.participantId)
        .update({
          last_contacted: {
            attempted_contact_date: data.attempted_contact_date,
            contact_method: data.contact_method,
            participant_responded: data.participant_responded,
            participant_response: data.participant_response,
            created_by: context.rootState.user,
            date_created: Date.now()
          }
        })
    }),
    createAttempt: firestoreAction((context, data) => {
      return db
        .collection('participants')
        .doc(data.participantId)
        .collection('study_list')
        .doc(data.studyId)
        .collection('contact_attempts')
        .add({
          attempted_contact_date: data.attempted_contact_date,
          contact_method: data.contact_method,
          participant_responded: data.participant_responded,
          participant_response: data.participant_response,
          created_by: context.rootState.user,
          date_created: Date.now()
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
    updateParticipantStudy: firestoreAction((context, data) => {
      return db
        .collection('participants')
        .doc(data.participantId)
        .collection('study_list')
        .doc(data.studyId)
        .update({
          notes: data.notes,
          participation_start_date: data.start_date,
          participation_end_date: data.end_date,
          date_updated: Date.now(),
          updated_by: context.rootState.user
        })
        .then(() => {
          console.log('participant updated!')
        })
    }),
    addParticipantStudy: firestoreAction((context, data) => {
      const study = db.collection('studies').doc(data.studyId)
      return db
        .collection('participants')
        .doc(data.participantId)
        .collection('study_list')
        .add({
          study: study,
          created_by: context.rootState.user,
          date_created: Date.now(),
          notes: '',
          participation_start_date: '',
          participation_end_date: ''
        })
    }),
    // Studies actions
    bindStudies: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('studies', db.collection('studies'))
    }),
    createStudy: firestoreAction((context, data) => {
      return db.collection('studies').add({
        name: data.name,
        pi: data.pi,
        grant_number: data.grant_number,
        date_created: Date.now(),
        created_by: context.rootState.user
      })
    }),
    setStudy: ({ commit }, id) => {
      return db
        .collection('studies')
        .doc(id)
        .get()
        .then(snapshot => {
          const study = snapshot.data()
          study.id = id
          commit('SET_STUDY', study)
        })
    },
    updateStudy: firestoreAction((context, data) => {
      return db
        .collection('studies')
        .doc(data.id)
        .update({
          name: data.name,
          pi: data.pi,
          grant_number: data.grant_number,
          updated_by: context.rootState.user,
          date_updated: Date.now()
        })
        .then(() => {
          console.log('study updated!')
        })
    })
  }
}
