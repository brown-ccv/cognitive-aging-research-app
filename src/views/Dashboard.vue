<template>
  <div>
    <p>People</p>
    <ul v-for="item in firebase.participants" v-bind:key="item.name">
      <li>{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['firebase'])
  },
  beforeCreate() {
    store.dispatch('firebase/bindParticipants')
  }
}
</script>
