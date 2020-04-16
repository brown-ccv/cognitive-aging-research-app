<template>
  <div>
    <h1 class="title">Potential Participants</h1>
    <BaseTable
      :tabledata="reducedData"
      :headings="headings"
      :filters="['name', 'year_born']"
      linkto="edit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('firebase', ['participants']),
    headings() {
      return Object.keys(this.reducedData[0])
    },
    reducedData() {
      let reducedData = this.participants.map(item => {
        delete item.preferred_time_of_contact
        delete item.contact_preference
        delete item.phone

        return {
          id: item.id,
          name: item.name,
          email: item.email,
          year_born: item.yob
        }
      })
      return reducedData
    }
  }
}
</script>
