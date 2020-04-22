<template>
  <div id="app" class="main-layout">
    <SideNav v-if="loggedIn" class="sidebar" @active="isActive" />
    <main
      class="router-view"
      v-bind:class="{ active: active, 'not-logged': !loggedIn }"
    >
      <router-view />
    </main>
  </div>
</template>

<script>
import store from '@/store/index'
import SideNav from '@/components/SideNav'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      active: true
    }
  },
  components: {
    SideNav
  },
  created() {
    store.dispatch('login/loginStatus')
    store.dispatch('firebase/bindStudies')
    store.dispatch('firebase/bindParticipants')
  },
  computed: {
    ...mapState(['loggedIn', 'user'])
  },
  methods: {
    isActive(value) {
      this.active = value
    }
  }
}
</script>

<style lang="sass" scoped>
.not-logged
  margin-left: 0 !important
  padding: 0 !important
</style>
