<template>
  <div>
    <template v-if="loggedIn">
      <button class="button is-warning" @click="signOut">Sign Out</button>
    </template>
    <span v-else>
      <router-link class="button is-success" to="/login">Sign In</router-link>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store/index'

export default {
  computed: {
    ...mapState(['loggedIn', 'user'])
  },
  methods: {
    signOut() {
      store.dispatch('logout/signOut')
    }
  }
}
</script>
