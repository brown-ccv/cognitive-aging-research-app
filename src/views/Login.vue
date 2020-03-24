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
    <h1 class="mt-1">OR</h1>
    <div class="mt-1">
      <button class="row button is-success" type="submit" @click="googleSignOn">
        <font-awesome-icon class="mr-1" :icon="['fab', 'google']" />
        Google Sign In
      </button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
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
      error: ''
    }
  },
  methods: {
    googleSignOn() {
      store.dispatch('login/googleSignOn')
    },
    login() {
      store.dispatch('login/signIn', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
