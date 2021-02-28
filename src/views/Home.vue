<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <Hero />
    <div class="overview block content">
      <h2>Overview</h2>
      <p>
        The Cognitive Research Network (CRN) at Brown University is actively
        conducting research to understand the cognitive and neural mechanisms of
        memory, learning, decision making, and cognitive control in adulthood.
        Researchers at the CRN are Brown faculty and students from a diverse
        background. The collaborative environment at Brown often enables us to
        have projects across traditional disciplinary boundaries. Our
        methodological toolbox includes behavioral experiments,
        psychophysiology, functional magnetic resonance imaging (fMRI),
        electroencephalography (EEG), eye-tracking, and computational modeling.
        You can find out more about the individual projects and research labs
        below. If you would like to help us by participating in our studies,
        please click the button above to fill out our volunteer registration
        form. Volunteers will be contacted to participate in new and ongoing
        studies at Brown CRN according to their preferences.
        <strong>
          You may opt-out at any time, to do so, please email
          nassarlab@brown.edu with your name and the phone number or email
          address you used for the registration form.</strong
        >
        We cannot wait to have you as part of our exciting cognitive research at
        Brown University!
      </p>
    </div>
    <div class="labs">
      <div class="labs-header block content">
        <h2>Member Labs</h2>
      </div>
      <div class="study-group">
        <div v-for="(study, i) in studies" :key="i" class="box study-box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <b-button
                  type="is-link"
                  tag="a"
                  :href="study.lab_link"
                  target="_blank"
                  pack="fas"
                  icon-right="external-link-square-alt"
                >
                  {{ study.lab_name }}
                </b-button>
                <h2>{{ study.name }}</h2>
                <p>{{ study.study_owner }}</p>
                <p>
                  <br />
                  {{ study.description }}
                  <br />
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hero from '@/components/Hero.vue'

export default {
  components: {
    Hero
  },
  computed: {
    ...mapState(['userProfile']),
    ...mapState('firebase', ['studies'])
  },
  beforeMount() {
    this.$store.dispatch('firebase/bindStudies')
  }
}
</script>

<style lang="sass" scoped>
.main-section
  margin-top: 10rem
.overview
  margin: 0px
  padding-top: 54px
  padding-bottom: 54px
  padding-left: 24px
  padding-right: 24px
  font-size: 20px
  justify-content: space-around
  background-color: whitesmoke
.labs
  margin:0px
  padding-top: 48px
  padding-bottom: 48px
  padding-left: 24px
  padding-right: 24px
.labs-header
  font-size: 20px
.study-group
  display: flex
  flex-wrap: wrap
  justify-content: space-around
.study-box
  width: 40ch
.width-30
  width: 30ch
</style>
