<template>
  <div>
    <div class="studies-title">
      <span class="title">Participant Studies</span>
    </div>
    <div class="study-table card">
      <table class="table">
        <thead>
          <th class="has-text-success">Study</th>
          <th class="has-text-success">Start Date</th>
          <th class="has-text-success">End Date</th>
          <th class="has-text-success">Notes</th>
          <th class="has-text-success"></th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in studies" v-bind:key="'study' + index">
            <td>{{ item.study.name }}</td>
            <td>
              {{
                item.participation_start_date.seconds | moment('DD/MMM/YYYY')
              }}
            </td>
            <td>
              {{ item.participation_end_date.seconds | moment('DD/MMM/YYYY') }}
            </td>
            <td>{{ item.notes }}</td>
            <td></td>
            <td>
              <button
                class="button is-primary"
                @click="selectStudy(item.study)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    studies: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectStudy(value) {
      this.$emit('studyId', value.id)
    }
  }
}
</script>

<style lang="sass" scoped></style>
