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
                    v-model="study.participation_start_date.seconds"
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
                    v-model="study.participation_end_date.seconds"
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
            :placeholder="study.notes"
            v-model="study.notes"
          ></textarea>
        </fieldset>
        <button type="button" class="button is-success ">
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

export default {
  components: {
    Datepicker
  },
  props: {
    study: {
      type: String,
      required: true
    },
    attempts: {
      type: Array,
      required: true
    }
  }
}
</script>
