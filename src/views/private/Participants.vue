<template>
  <div>
    <h1 class="title">Potential Participants</h1>
    <div v-for="(p, i) in participants" v-bind:key="i">
      {{ p.study_list }}
    </div>
    <form v-on:submit.prevent="handleFilter">
      <div class="field-inline">
        <label for="name" class="filter-label">Filter by Name:</label>
        <BaseInput id="name" type="text" placeholder="Name" v-model="name" />
      </div>
      <div class="field-inline">
        <h1 class="filter-label">Born between:</h1>

        <BaseInput
          id="start"
          type="text"
          placeholder="year"
          v-model="startYear"
        />
        <p>and</p>
        <BaseInput id="end" type="text" placeholder="year" v-model="endYear" />
      </div>
      <div class="field-inline">
        <h1 class="filter-label">Participated in Study:</h1>
        <BaseSelect
          id="study"
          :options="studiesNames"
          v-model="selectedStudy"
        />
        <p>in</p>
        <BaseInput
          id="studyYear"
          type="text"
          placeholder="year"
          v-model="studyYear"
        />
      </div>

      <button class="button is-info filter-button" type="submit">Filter</button>
      <button
        class="button is-light filter-button"
        type="button"
        @click="reset"
      >
        Reset
      </button>
    </form>

    <BaseTable
      v-if="reducedData.length > 0"
      :tabledata="reducedData"
      :headings="headings"
      linkto="edit"
    />
    <div v-else>No results match your search</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedStudy: null,
      startYear: null,
      endYear: null,
      studyYear: null,
      name: null
    }
  },
  computed: {
    ...mapState('firebase', ['participants', 'studies']),
    studiesNames() {
      const options = this.studies.map(study => study.name)
      options.unshift('-')
      return options
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
      const queryStudy = this.$route.query.study
      const queryStudyYear = this.$route.query.study_year
      const queryName = this.$route.query.name

      const selectedStudy = queryStudy ? queryStudy : false
      const studyYear = queryStudyYear ? queryStudyYear : false
      const start = queryYearStart ? queryYearStart : this.minMaxYear[0]
      const end = queryYearEnd ? queryYearEnd : this.minMaxYear[1]
      const name = queryName ? queryName.toLowerCase() : false

      return this.participants.filter(participant => {
        const matchStudyYear = participant.in_studies
          .map(s => {
            const year = s.start_date.split('-')[0]
            if (year === studyYear || studyYear === false) {
              return s.name
            }
          })
          .includes(selectedStudy)

        const filterByStudy = selectedStudy ? matchStudyYear : true
        const filterByName =
          participant.name.toLowerCase().includes(name) || name === false
            ? true
            : false
        return (
          parseInt(participant.yob) >= start &&
          parseInt(participant.yob) <= end &&
          filterByStudy &&
          filterByName
        )
      })
    },
    reducedData() {
      let reducedData = this.filteredParticipants.map(item => {
        delete item.preferred_time_of_contact
        delete item.contact_preference
        delete item.phone
        console.log(item)

        return {
          id: item.id,
          name: item.name,
          email: item.email,
          year_born: item.yob,
          in_studies: item.in_studies,
          last_contacted: item.last_contacted.attempted_contact_date
        }
      })
      return reducedData
    }
  },
  methods: {
    handleFilter() {
      this.$router.push({
        name: 'participants',
        query: {
          start_year: this.startYear,
          end_year: this.endYear,
          study: this.selectedStudy,
          study_year: this.studyYear,
          name: this.name
        }
      })
    },
    reset() {
      document.getElementById('name').value = ''
      document.getElementById('start').value = ''
      document.getElementById('end').value = ''
      document.getElementById('studyYear').value = ''

      this.selectedStudy = null
      this.startYear = null
      this.endYear = null
      this.studyYear = null
      this.name = null

      this.$router.push({ name: 'participants' })
    }
  }
}
</script>
<style lang="sass" scoped>
@import 'bulma'
.field-inline
  align-items: center
.field
  margin-left: 1rem
  margin-right: 1rem
  margin-bottom: 0 !important
.filter-label
  @extend .label
  margin-bottom: 0 !important
.filter-button
  margin-top: 2rem
  margin-bottom: 2rem
  margin-right: 1rem
</style>
