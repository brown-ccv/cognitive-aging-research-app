<template>
  <div>
    <div class="studies-title">
      <span class="title">{{ study }}</span>
    </div>
    <div class="study-table card">
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
export default {
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
