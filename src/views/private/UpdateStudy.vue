<template>
  <div>
    <UpdateStudy />
  </div>
</template>

<script>
import store from '@/store/index'
import UpdateStudy from '@/components/UpdateStudy.vue'

export default {
  components: {
    UpdateStudy
  },
  created() {
    store.dispatch('firebase/setStudy', this.$route.params.id)
  }
}
</script>
