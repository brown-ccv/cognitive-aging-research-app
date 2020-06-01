<template>
  <div>
    <UpdateParticipant />
  </div>
</template>

<script>
import UpdateParticipant from '@/components/UpdateParticipant'
import store from '@/store/index'

export default {
  components: {
    UpdateParticipant
  },
  created() {
    store.dispatch('firebase/bindParticipantStudies', this.$route.params.id)
    store.dispatch('firebase/setParticipant', this.$route.params.id)
  }
}
</script>
