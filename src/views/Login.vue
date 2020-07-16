<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div v-if="error">{{ error.message }}</div>
    <div class="container">
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
      password: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    async login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$store.dispatch('login/authenticate', response)
          this.$store.dispatch('firebase/bindStudies')
          this.$store.dispatch('firebase/bindParticipants')
        })
        .catch(err => {
          throw err.message
        })
      this.$router.replace({ name: 'dashboard' })
    }
  }
}
</script>
