<template>
  <div>
    <ParticipantTable />
    <div
      v-for="(person, index) in firebase.participants"
      v-bind:key="'participant' + index"
    >
      {{ person }}
    </div>
    <br />
    {{ firebase.participant_studies }}
    <br />
    <div
      v-for="(study, index) in firebase.studies"
      v-bind:key="'study' + index"
    >
      {{ study.id }}
      <router-link
        :to="{ name: 'update_study', params: { studyId: study.id } }"
      >
        Edit
      </router-link>
    </div>
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
