<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item class="navbar-header-end" tag="a" href="https://brown.edu">
        <BrownLogo />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item class="custom-size" href="/">
        Cognitive Research Home
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-light"
            @click="login"
            pack="fas"
            icon-right="sign-in-alt"
          >
            Researcher Login
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import BrownLogo from '@/components/BrownLogo'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { mapState } from 'vuex'
import { db } from '@/main'

export default {
  components: {
    BrownLogo
  },
  computed: {
    ...mapState(['userProfile'])
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
          .collection('administrators')
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
        this.$router.replace({ name: 'login-failed' })
      }
    },
    hideNotification() {
      this.showNotification = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-name {
  padding-left: 40px;
}
.navbar-header-end {
  padding-right: 20px;
  border-right: 1px solid grey;
}
.custom-size {
  font-size: 20px;
  padding-left: 20px;
}
</style>
