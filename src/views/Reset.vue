<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div v-if="error">{{ error.message }}</div>
    <main class="login content">
      <div class="login-container">
        <h1>Reset Password</h1>
        <BaseNotification
          v-if="showNotification"
          :text="message"
          :variant="notificationVariant"
          @close="hideNotification()"
        >
        </BaseNotification>
        <form @submit.prevent="reset">
          <BaseInput
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            v-model="email"
            @blur="$v.email.$touch()"
            :error="$v.email.$error"
            :valid="!$v.email.$invalid"
          >
          </BaseInput>
          <button class="button is-success" type="submit">
            Send reset password email
          </button>
        </form>
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

export default {
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data() {
    return {
      email: '',
      error: '',
      sent: '',
      showNotification: false,
      message: '',
      notificationVariant: ''
    }
  },
  computed: {
    ...mapState(['userProfile']),
    errorMessage() {
      return `An erro has occurred, please try again. ${this.error}`
    },
    successMessage() {
      return `Sent password reset link to ${this.email}`
    }
  },
  methods: {
    reset() {
      let that = this
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function() {
          that.sent = true
          that.message = that.successMessage
          that.showNotification = true
          that.notificationVariant = 'success'
        })
        .catch(function(err) {
          that.error = err.message
          that.showNotification = true
          that.message = that.errorMessage
          that.notificationVariant = 'danger'
        })
    },
    hideNotification() {
      this.showNotification = false
    }
  }
}
</script>
