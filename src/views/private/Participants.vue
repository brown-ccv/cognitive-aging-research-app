<template>
  <div>
    {{ selectedStudies }}
    <h1 class="title">Potential Participants</h1>
    <div v-for="(p, i) in participants" v-bind:key="i">
      {{ p.study_list }}
    </div>
    <form v-on:submit.prevent="handleFilter">
      <input v-model="startYear" class="input" type="text" id="start" />
      <input v-model="endYear" class="input" type="text" id="end" />
      <multiselect
        v-model="selectedStudies"
        :options="studiesNames"
        :multiple="true"
      />
      <button type="submit">Filter</button>
    </form>
    <BaseTable :tabledata="reducedData" :headings="headings" linkto="edit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data() {
    return {
      selectedStudies: null,
      startYear: null,
      endYear: null
    }
  },
  computed: {
    ...mapState('firebase', ['participants', 'studies']),
    studiesNames() {
      return this.studies.map(study => study.name)
    },
    headings() {
      return Object.keys(this.reducedData[0])
    },
    minMaxYear() {
      const yob = this.participants.map(participant =>
        parseInt(participant.yob)
      )
      const min = yob.reduce((a, b) => Math.min(a, b))
      const max = yob.reduce((a, b) => Math.max(a, b))
      return [min, max]
    },
    filteredParticipants() {
      const queryYearStart = this.$route.query.start_year
      const queryYearEnd = this.$route.query.end_year
      let start = queryYearStart ? queryYearStart : this.minMaxYear[0]
      let end = queryYearEnd ? queryYearEnd : this.minMaxYear[1]
      return this.participants.filter(participant => {
        return (
          parseInt(participant.yob) >= start && parseInt(participant.yob) <= end
        )
      })
    },
    reducedData() {
      let reducedData = this.filteredParticipants.map(item => {
        delete item.preferred_time_of_contact
        delete item.contact_preference
        delete item.phone

        return {
          id: item.id,
          name: item.name,
          email: item.email,
          year_born: item.yob,
          in_studies: item.in_studies
        }
      })
      return reducedData
    }
  },
  methods: {
    handleFilter() {
      this.$router.push({
        name: 'participants',
        query: { start_year: this.startYear, end_year: this.endYear }
      })
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
