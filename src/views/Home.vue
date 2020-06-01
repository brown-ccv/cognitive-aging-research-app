<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <h1 v-show="userProfile" class="title">
      Add New Participant
    </h1>
    <CreateParticipant v-bind:class="{ 'main-section': !userProfile }" />
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
    ...mapState(['userProfile'])
  }
}
</script>

<style lang="sass">
.main-section
  margin-top: 10rem
</style>
