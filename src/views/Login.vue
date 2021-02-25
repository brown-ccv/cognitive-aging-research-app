<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div v-if="error">{{ error.message }}</div>
    <main class="login content">
      <div class="login-container">
        <h1>Researcher Login</h1>
        <p>Please login with you Brown Gmail Account</p>
        <p>Only resgistered researchers can login</p>
        <BaseNotification
          v-if="showNotification"
          :text="message"
          :variant="notificationVariant"
          @close="hideNotification()"
        >
        </BaseNotification>
        <form @submit.prevent="login">
          <button class="button is-success" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { mapState } from 'vuex'
import { db } from '@/main'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: '',
      showNotification: false,
      message: '',
      notificationVariant: ''
    }
  },
  computed: {
    ...mapState(['userProfile']),
    errorMessage() {
      return `${this.error} Please try again. `
    }
  },
  methods: {
    async validAccountCheck(response) {
      let user = firebase.auth().currentUser
      console.log(user)
      console.log(user.email)
      console.log(response)
      //   const respUser = response.user.email
      try {
        await db
          .collection('admin')
          .doc(user.email)
          .get()
        this.$store.dispatch('login/authenticate', user.email)
        this.$store.dispatch('firebase/bindStudies')
        this.$store.dispatch('firebase/bindParticipants')
        return true
      } catch (err) {
        console.log('Not authorized1')
        console.log(err)
        return false
      }
    },

    async login() {
      try {
        var provider = new firebase.auth.GoogleAuthProvider()

        let response = await firebase.auth().signInWithPopup(provider)

        let validAccount = await this.validAccountCheck(response)

        if (!validAccount) {
          await firebase.auth().signOut()
          throw new Error('Invalid User')
        }
        this.$router.replace({ name: 'dashboard' })
      } catch (err) {
        console.log('Not authorized2')

        console.log(err)
        this.error = err.message
        this.showNotification = true
        this.message = this.errorMessage
        this.notificationVariant = 'danger'
      }
    },
    hideNotification() {
      this.showNotification = true
    }
  }
}
</script>
