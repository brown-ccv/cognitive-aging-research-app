<template>
  <div class="dashboard-grid">
    <div class="dashboard-grid-studies content">
      <div class="studies-title">
        <span class="title">Current Studies</span>
        <span class="new-study"
          ><router-link to="/new_study">+ New Study</router-link></span
        >
      </div>
      <div class="study-table card">
        <table class="table">
          <thead>
            <th class="has-text-success">Study</th>
            <th class="has-text-success">PI</th>
            <th class="has-text-success">Grant number</th>
            <th class="has-text-success"># participants</th>
            <th class="has-text-success"></th>
          </thead>
          <tbody>
            <tr v-for="(study, index) in studies" v-bind:key="'study' + index">
              <td>{{ study.name }}</td>
              <td>{{ study.pi }}</td>
              <td>{{ study.grant_number }}</td>
              <td></td>
              <td>
                <router-link
                  class="button is-link is-small"
                  :to="{ name: 'update_study', params: { studyId: study.id } }"
                >
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
