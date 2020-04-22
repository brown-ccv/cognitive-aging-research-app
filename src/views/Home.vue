<template>
  <div>
    <BaseNavBar v-if="!loggedIn" />
    <h1 v-show="loggedIn" class="title">
      Add New Participant
    </h1>
    <CreateParticipant v-bind:class="{ 'main-section': !loggedIn }" />
  </div>
</template>

<script>
import CreateParticipant from '@/components/CreateParticipant'
import { mapState } from 'vuex'
export default {
  components: {
    CreateParticipant
  },
  computed: {
    ...mapState(['loggedIn'])
  }
}
</script>

<style lang="sass">
.main-section
  margin-top: 10rem
</style>
