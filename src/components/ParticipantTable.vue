<template>
  <div class="content">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Study</th>
          <th>Attempted Contact</th>
          <th>Contact Method</th>
          <th>Participant Responded</th>
          <th>Participation Start Date</th>
          <th>Participation End Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in firebase.participants" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.study }}</td>
          <td>{{ item.attempted_contact_date }}</td>
          <td>{{ item.contact_method }}</td>
          <td>{{ item.participant_responded }}</td>
          <td>{{ item.paticipated_start_date }}</td>
          <td>{{ item.participated_end_date }}</td>
          <td>
            <router-link
              :to="{ name: 'edit', params: { participantId: item.id } }"
            >
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['firebase'])
  }
}
</script>
