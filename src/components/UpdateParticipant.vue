<template>
  <div>
    <aside>
      <ParticipantInfo
        :participant="participant"
        :studies="participant_studies"
      />
      <StudiesInfo :studies="participant_studies" @studyId="getStudyId" />
      <form v-if="notInStudies.length > 0" v-on:submit.prevent="submitForm">
        <div class="study-card">
          <label class="label" for="enroll">Enroll in Study</label>
          <div class="field add-button">
            <div class="control">
              <div class="select">
                <select id="enroll" v-model="studyToEnroll">
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
          <button class="button is-info is-small">
            Enroll
          </button>
        </div>
      </form>
    </aside>
    <main class="">
      <div v-if="current_study.study">
        <div v-if="viewDetails">
          <UpdateParticipantStudy
            :study="current_study"
            :participantId="participant.id"
            :attempts="contact_attempts"
          />
        </div>
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

export default {
  components: {
    ParticipantInfo,
    StudiesInfo,
    UpdateParticipantStudy
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
