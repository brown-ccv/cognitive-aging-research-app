<template>
  <div>
    <h1 class="title">Welcome</h1>
    <main class="dashboard">
      <DashboardCard header="Studies" :main="studies.length" />
      <DashboardCard
        header="Participants"
        :main="participants.length"
        footer="registered"
      />
      <DashboardCard
        header="Administrators"
        :main="administrators.length"
        footer="registered"
      />
    </main>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard'
import { mapState } from 'vuex'

export default {
  components: {
    DashboardCard
  },
  computed: {
    ...mapState('firebase', ['participants', 'studies', 'administrators']),
    ...mapState(['userProfile'])
  }
}
</script>

<style lang="sass">
.dashboard
    display: flex
    flex-wrap: wrap
</style>
