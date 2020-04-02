<template>
  <div class="dashboard-grid">
    <div class="dashboard-grid-studies content">
      <div class="studies-title">
        <span class="title">Current Studies</span>
        <span class="new-study"
          ><router-link to="/new_study">+ New Study</router-link></span
        >
      </div>
      <div class="studies-content">
        <div v-for="(study, index) in studies" v-bind:key="'study' + index">
          <router-link
            :to="{ name: 'update_study', params: { studyId: study.id } }"
          >
            <div class="study-card card has-background-info">
              <p class="title">{{ study.name }}</p>
              <p class="subtitle">{{ study.pi }}</p>
              <p class="subtitle">Grant: {{ study.grant_number }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="dashboard-grid-recruit content">
      <router-link class="title" to="/participants">Recruit</router-link>
    </div>
    <div class="dashboard-grid-participants content">
      <h1>Latest Potential Participants</h1>
      <div
        v-for="(participant, index) in participants"
        v-bind:key="'participant' + index"
      >
        {{ participant.name }}
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapState } from 'vuex'

export default {
  beforeCreate() {
    store.dispatch('firebase/bindParticipants')
    store.dispatch('firebase/bindStudies')
  },
  computed: {
    ...mapState('firebase', ['studies', 'participants'])
  }
}
</script>

<style lang="sass" scoped>
.dashboard-grid
  display: grid
  grid-template-areas: ". studies . participants ." ". recruit . participants ."
  grid-template-columns: 1fr 6fr 1fr 4fr 1fr
  grid-template-rows: auto auto
  &-studies
    grid-area: studies
  &-recruit
    grid-area: recruit
  &-participants
    grid-area: participants

.study-card
  width: 12rem
  padding: 2rem
  margin-bottom: 1rem
  border-radius: 3px
  .title
    font-size: 1.4rem
.studies-content
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
.studies-title
  display: flex
  align-content: center
.new-study
  margin-left: 1rem
  padding-top: 0.4rem
</style>
