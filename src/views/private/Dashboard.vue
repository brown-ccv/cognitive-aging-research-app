<template>
  <div>
    <ParticipantTable />
    <div v-for="(person, index) in firebase.participants" v-bind:key="index">
      {{ person }}
    </div>
    <br />
    {{ firebase.studies }}
    {{ firebase.participant_study_list }}
  </div>
</template>

<script>
import ParticipantTable from '@/components/ParticipantTable'
import store from '@/store/index'
import { mapState } from 'vuex'

export default {
  beforeCreate() {
    store.dispatch('firebase/bindParticipants')
    store.dispatch('firebase/bindStudies')
  },
  computed: {
    ...mapState(['firebase'])
  },
  components: {
    ParticipantTable
  }
}
</script>
