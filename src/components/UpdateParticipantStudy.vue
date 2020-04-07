<template>
  <div>
    <div class="studies-title">
      <span class="title">{{ study.study.name }}</span>
    </div>
    <div class="card study-table">
      <form v-on:submit.prevent="submitForm">
        <fieldset class="fieldset">
          <div class="field-inline">
            <div class="field">
              <div class="control">
                <label class="label">Start Date</label>
                <div class="select">
                  <datepicker
                    input-class="datepicker-input"
                    v-model="form.start_date.seconds"
                    :format="dateFormat"
                    name="attempted_contact"
                  ></datepicker>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="label">End Date</label>
                <div class="select">
                  <datepicker
                    input-class="datepicker-input"
                    v-model="form.end_date.seconds"
                    :format="dateFormat"
                    name="attempted_contact"
                  ></datepicker>
                </div>
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
        <button class="button is-success ">
          Save
        </button>
      </form>
    </div>
    <div class="study-table card">
      <h1>Contact Attempts</h1>
      <table class="table">
        <thead>
          <th class="has-text-success">Attempt Date</th>
          <th class="has-text-success">Method</th>
          <th class="has-text-success">Participant Responded</th>
          <th class="has-text-success">Participant Response</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in attempts" v-bind:key="'attempt' + index">
            <td>
              {{ item.attempted_contact_date.seconds | moment('DD/MMM/YYYY') }}
            </td>
            <td>{{ item.contact_method }}</td>
            <td>{{ item.participant_responded }}</td>
            <td>{{ item.participant_response }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  components: {
    Datepicker
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
