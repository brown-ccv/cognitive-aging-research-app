<template>
  <div>
    <h1 class="title">
      Studies
    </h1>
    <label for="studies-table" class="label is-large">Current Studies</label>
    <BaseTable
      id="studies-table"
      :tabledata="reducedData"
      :headings="headings"
      linkto="update_study"
    />
    <CreateStudy />
  </div>
</template>

<script>
import CreateStudy from '@/components/CreateStudy.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CreateStudy
  },
  computed: {
    ...mapState('firebase', ['studies']),
    headings() {
      return Object.keys(this.reducedData[0])
    },
    reducedData() {
      let reducedData = this.studies.map(item => {
        return {
          id: item.id,
          lab_name: item.lab_name,
          pi: item.pi,
          name: item.name,
          study_owner: item.study_owner,
          description: item.description,
          lab_link: item.lab_link
        }
      })
      return reducedData
    }
  }
}
</script>
<style lang="sass" scoped>
.section
  width: 100%
  display: flex
  justify-content: center
  flex-direction: column
</style>
