<template>
  <div class="container">
    <h1 class="title">Create an account for a fellow researcher</h1>
    <div v-if="error">{{ error.message }}</div>
    <form @submit.prevent="register">
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
      <BaseInput
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        v-model="password"
        @blur="$v.password.$touch()"
        :error="$v.password.$error"
        :valid="!$v.password.$invalid"
      >
      </BaseInput>
      <div class="control">
        <div v-if="success">
          Account created successfully.
          <font-awesome-icon class="success" icon="check" />
        </div>
        <div v-else-if="failed" class="flex">
          <button
            :disabled="$v.$anyError"
            class="button is-primary"
            :class="{ loading: loading }"
          >
            Save
          </button>
          <div>
            Failed to create account, try again.
            <font-awesome-icon class="error" icon="exclamation-circle" />
          </div>
        </div>
        <button
          v-else
          :disabled="$v.$anyError"
          class="button is-primary"
          :class="{ loading: loading }"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store/index'

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
      password: '',
      error: '',
      loading: false,
      success: false,
      failed: false,
      submission_error: '',
      sent: false
    }
  },
  methods: {
    register() {
      store
        .dispatch('register/registerUser', {
          email: this.email,
          password: this.password
        })
        .then(
          () => {
            this.loading = false
            this.success = true
            this.reset()
          },
          err => {
            this.failed = true
            this.submission_error = err
          }
        )
    },
    reset() {
      let that = this
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(function() {
          that.sent = true
        })
        .catch(function(err) {
          that.error = err.message
          that.sent = false
        })
    }
  }
}
</script>
