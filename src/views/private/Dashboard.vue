<template>
  <ParticipantTable />
</template>

<script>
import ParticipantTable from '@/components/ParticipantTable'
import store from '@/store/index'

export default {
  beforeCreate() {
    store.dispatch('firebase/bindParticipants')
  },
  components: {
    ParticipantTable
  }
}
</script>
