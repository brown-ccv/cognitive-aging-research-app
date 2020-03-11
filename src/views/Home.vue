<template>
  <div>
    <p>People</p>
    <ul v-for="item in participants" v-bind:key="item.name">
      <li>{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('bindParticipants')
  },
  data() {
    return {
      participants: this.$store.state.participants
    }
  }
}
</script>
