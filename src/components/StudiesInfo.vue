<template>
  <div>
    <div class="studies-title">
      <h1 class="title">Participant Studies</h1>
    </div>
    <main class="studies">
      <div
        v-for="(item, index) in studies"
        v-bind:key="'study' + index"
        class="study-card"
      >
        <div class="study-title">{{ item.study.name }}</div>
        <div class="study-content">
          <p v-show="item.participation_start_date" class="small">
            <span>start date: </span>{{ item.participation_start_date }}
          </p>
          <p v-show="item.participation_end_date" class="small">
            <span>start date: </span>{{ item.participation_end_date }}
          </p>
          <button
            class="button is-link is-small"
            @click="selectStudy(item.study)"
          >
            Details
          </button>
        </div>
      </div>
    </main>
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

<style lang="sass">
@import 'bulma'
.studies-title
  margin-top: 3rem
.studies
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  align-content: center
  margin-top: 3rem
.study-card
  border: 1px solid $primary
  border-radius: 3px
  width: 15rem
  margin-bottom: 2rem
  margin-right: 2rem
  padding: 1rem
.study-title
  font-size: 1rem
  @extend .has-text-primary
  font-weight: bold
.study-content
  height: 100%
  p
    margin-top: 0.2rem
  button
    margin-top: 1.5rem
</style>
