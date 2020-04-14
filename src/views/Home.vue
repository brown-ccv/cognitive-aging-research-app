<template>
  <div>
    <BaseNavBar v-if="!loggedIn" />
    <CreateParticipant class="main-section" />
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
  margin-top: 4rem
</style>
