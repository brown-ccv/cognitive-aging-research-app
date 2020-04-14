<template>
  <div class="two-column-grid">
    <aside class="two-column-grid-side">
      <ParticipantInfo :participant="participant" />
      <StudiesInfo :studies="participant_studies" @studyId="getStudyId" />

      <form v-on:submit.prevent="submitForm">
        <div class="field-inline">
          <div class="field add-button">
            <div class="control">
              <div class="select">
                <select v-model="studyToEnroll">
                  <option
                    v-for="(option, index) in notInStudies"
                    v-bind:value="option.id"
                    v-bind:key="index"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button class="button is-info">
            Enroll in New Study
          </button>
        </div>
      </form>
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
      viewDetails: true,
      studyToEnroll: ''
    }
  },
  computed: {
    ...mapState('firebase', [
      'studies',
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
    },
    form() {
      return {
        participantId: this.participant.id,
        studyId: this.studyToEnroll
      }
    },
    notInStudies() {
      const inStudies = this.participant_studies.map(study => study.study.id)
      const difference = this.studies.filter(x => !inStudies.includes(x.id))
      return difference
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
    },
    updateValue(event) {
      this.form.studyId = event.target.value
    },
    submitForm() {
      this.$store.dispatch('firebase/addParticipantStudy', this.form)
    }
  }
}
</script>
