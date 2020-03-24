import * as firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router/index'

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export default {
  namespaced: true,
  actions: {
    async signOut() {
      await firebase
        .auth()
        .signOut()
        .then(() => router.replace({ name: 'login' }))
    }
  }
}
