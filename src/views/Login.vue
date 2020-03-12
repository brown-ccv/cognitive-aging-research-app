<template>
  <div class="container">
    <div v-if="error">{{ error.message }}</div>
    <form @submit.prevent="login">
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
      <button class="button is-success" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import * as firebase from 'firebase/app'
import 'firebase/auth'

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
      error: ''
    }
  },
  methods: {
    async login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => console.log(response))
        .catch(err => console.log(err.message))
    }
  }
}
</script>
