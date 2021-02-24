<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div v-if="error">{{ error.message }}</div>
    <main class="login content">
      <div class="login-container">
        <h1>Researcher Login</h1>
        <BaseNotification
          v-if="showNotification"
          :text="message"
          :variant="notificationVariant"
          @close="hideNotification()"
        >
        </BaseNotification>
        <form @submit.prevent="login">
          <BaseInput
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            v-model="form.email"
            @blur="$v.form.email.$touch()"
            :error="$v.form.email.$error"
            :valid="!$v.form.email.$invalid"
          >
          </BaseInput>
          <BaseInput
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            :error="$v.form.password.$error"
            :valid="!$v.form.password.$invalid"
          >
          </BaseInput>
          <button class="button is-success" type="submit">
            Login
          </button>
        </form>
        <router-link to="/reset">Reset your password</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { mapState } from 'vuex'
import { db } from '@/main'

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
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
    validAccountCheck(response) {
      let user = firebase.auth().currentUser
      console.log(user)
      console.log(user.email)
      console.log(response)
      //   const respUser = response.user.email
      return db
        .collection('admin')
        .doc(user.email)
        .get()
        .then(() => {
          this.$store.dispatch('login/authenticate', user.email)
          this.$store.dispatch('firebase/bindStudies')
          this.$store.dispatch('firebase/bindParticipants')
          return true
        })
        .catch(err => {
          // Not a white-listed user
          console.log(err)
          return false
        })
    },

    login() {
      let that = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          await firebase
            .auth()
            // .signInWithEmailAndPassword(this.form.email, this.form.password)
            .signInWithPopup(provider)
            .then(response => {
              this.validAccountCheck(response).then(validAccount => {
                if (validAccount) {
                  console.log('Valid User')
                } else {
                  firebase.auth().signOut()
                  console.log('Invalid User')
                  throw new Error('Error text.')
                }
              })
            })
          this.$router.replace({ name: 'dashboard' })
        })
        .catch(err => {
          that.error = err.message
          that.showNotification = true
          that.message = that.errorMessage
          that.notificationVariant = 'danger'
        })
    },
    hideNotification() {
      this.showNotification = true
    }
  }
}
</script>
