import * as firebase from 'firebase/app'
import 'firebase/auth'

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export default {
  namespaced: true,
  actions: {
    async registerUser({ commit }, credentials) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(res => res)
        .catch(err => {
          commit('SET_ERROR', err)
        })
    }
  }
}
