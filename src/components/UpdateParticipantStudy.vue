<template>
  <div>
    <span class="title">{{ study.study.name }}</span>
    <div class="study-table">
      <form v-on:submit.prevent="submitForm">
        <fieldset class="fieldset">
          <div class="field-inline">
            <div class="field field-date">
              <label class="label">Start Date: {{ form.start_date }}</label>
              <div class="control has-icons-right">
                <input
                  class="date-input"
                  type="date"
                  v-model="form.start_date"
                />
                <span class="icon is-small is-right">
                  <font-awesome-icon icon="calendar" />
                </span>
              </div>
            </div>
            <div class="field field-date">
              <label class="label">End Date: {{ form.end_date }}</label>
              <div class="control has-icons-right">
                <input class="date-input" type="date" v-model="form.end_date" />
                <span class="icon is-small is-right">
                  <font-awesome-icon icon="calendar" />
                </span>
              </div>
            </div>
          </div>
          <label class="label" for="notes">Notes</label>
          <textarea
            class="textarea"
            name=""
            id="notes"
            cols="30"
            rows="10"
            v-model="form.notes"
          ></textarea>
        </fieldset>
        <button class="button is-primary ">
          Save
        </button>
      </form>
    </div>
    <div class="study-table">
      <p class="title">Contact Attempts</p>
      <BaseTable
        id="contact-attempts"
        :tabledata="cleanAttempts"
        :headings="[
          'Attempt Date',
          'Method',
          'Participant Responded',
          'Participant Response',
          'Attempted By'
        ]"
      />
    </div>
    <AddAttempt :current_study="study" :participantId="participantId" />
  </div>
</template>

<script>
import moment from 'moment'
import AddAttempt from '@/components/AddAttempt'
export default {
  components: {
    AddAttempt
  },
  computed: {
    form() {
      return {
        participantId: this.participantId,
        studyId: this.study.id,
        start_date: this.study.participation_start_date,
        end_date: this.study.participation_end_date,
        notes: this.study.notes
      }
    },
    cleanAttempts() {
      return this.attempts.map(item => {
        return {
          attempted_contact_date: item.attempted_contact_date,
          contact_method: item.contact_method,
          participant_responded: item.participant_responded,
          participant_response: item.participant_response,
          attempted_by: item.created_by
        }
      })
    }
  },
  props: {
    participantId: {
      type: String,
      required: true
    },
    study: {
      type: Object,
      required: true
    },
    attempts: {
      type: Array,
      required: true
    }
  },
  methods: {
    dateFormat(date) {
      return moment(date).format('DD/MMM/YYYY')
    },
    submitForm() {
      console.log('submitted')
      this.$store.dispatch('firebase/updateParticipantStudy', this.form)
    }
  }
}
</script>

<style lang="sass" scoped>
.study-table
  margin-top: 2rem
</style>
