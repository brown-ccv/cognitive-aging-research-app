<template>
  <div class="two-column-grid">
    <aside class="two-column-grid-side">
      <ParticipantInfo :participant="participant" />
      <StudiesInfo :studies="participant_studies" @studyId="getStudyId" />
      <button class="button is-info add-button" type="button">
        Enroll in New Study
      </button>
    </aside>
    <main class="two-column-grid-main content">
      <div v-if="current_study.study">
        <div v-if="viewDetails">
          <UpdateParticipantStudy
            :study="current_study"
            :participantId="participant.id"
            :attempts="contact_attempts"
          />
          <button
            class="button is-info add-button"
            @click="toggleAddView"
            type="button"
          >
            Add an Attempt to Contact
          </button>
        </div>
        <AddAttempt
          v-else
          :current_study="current_study"
          :participantId="participant.id"
          @success="isSuccess"
        />
      </div>
    </main>
  </div>
</template>

<script>
import store from '@/store/index'

import { mapState } from 'vuex'
import ParticipantInfo from '@/components/ParticipantInfo'
import StudiesInfo from '@/components/StudiesInfo'
import UpdateParticipantStudy from '@/components/UpdateParticipantStudy'
import AddAttempt from '@/components/AddAttempt'

export default {
  components: {
    ParticipantInfo,
    StudiesInfo,
    UpdateParticipantStudy,
    AddAttempt
  },
  data() {
    return {
      studyId: '',
      viewDetails: true
    }
  },
  computed: {
    ...mapState('firebase', [
      'participant',
      'participant_studies',
      'contact_attempts'
    ]),
    current_study() {
      const filtered = this.participant_studies.filter(
        study => study.study.id == this.studyId
      )
      const selected = filtered.length > 0 ? filtered[0] : {}
      return selected
    }
  },
  methods: {
    getStudyId(value) {
      this.studyId = value
      const ids = {
        participant: this.participant.id,
        study: this.current_study.id
      }
      store.dispatch('firebase/bindContactAttempts', ids)
    },
    toggleAddView() {
      this.viewDetails = !this.viewDetails
    },
    isSuccess(value) {
      if (value) {
        this.viewDetails = true
      }
    }
  }
}
</script>

<style lang="sass">
.add-button
  margin-top: 1rem
.two-column-grid
    display: grid
    grid-template-areas: "side . main"
    grid-template-columns: 6fr 0.2fr 8fr
    grid-template-rows: auto
    &-side
        grid-area: side
        padding: 1rem
    &-main
        grid-area: main
        padding: 1rem

.field-inline
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: flex-start
  .field
    margin-right: 2rem

.datepicker-input
  font-size: 0.9rem
  height: 2.4rem
  padding: 0.8rem
  border-radius: 4px
  border: 1px solid gray
</style>
