import * as firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router/index'

const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export default {
  namespaced: true,
  actions: {
    async googleSignOn({ commit }) {
      await firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(response => {
          commit('SET_LOGGED_IN', response, { root: true })
          router.push({ name: 'dashboard' })
        })
        .catch(err => {
          commit('SET_ERROR', err, { root: true })
        })
    },
    async signIn({ commit }, credentials) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          commit('SET_LOGGED_IN', response, { root: true })
          router.push({ name: 'dashboard' })
        })
        .catch(err => {
          commit('SET_ERROR', err, { root: true })
        })
    },
    async loginStatus({ commit }) {
      await firebase.auth().onAuthStateChanged(user => {
        commit('SET_LOGGED_STATUS', !!user, { root: true })
        if (user) {
          commit('SET_USER_STATE', user, { root: true })
          localStorage.crpuser = user.displayName
        }
      })
    }
  }
}
