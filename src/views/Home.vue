<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div class="is-flex is-align-items-center is-flex-direction-column pb-6">
      <h1 class="title">Cognitive Research at Brown</h1>
      <p>
        Some description about what this portal is and why you want
        participants. See below our current studies.
      </p>
      <router-link
        to="new-participant"
        class="button is-primary is-large has-text-dark width-30"
        >Click here to enter your name</router-link
      >
    </div>
    <div class="study-group">
      <div v-for="(study, i) in studies" :key="i" class="box study-box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <span class="tag is-link is-large"
                ><a class="has-text-white" :href="study.lab_link"
                  >{{ study.lab_name
                  }}<font-awesome-icon
                    class="ml-3"
                    icon="external-link-square-alt"/></a
              ></span>
              <h2>{{ study.name }}</h2>
              <p>{{ study.study_owner }}</p>
              <p>
                <br />
                {{ study.description }}
                <br />
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="retweet">
                  <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState(['userProfile']),
    ...mapState('firebase', ['studies'])
  },
  beforeMount() {
    this.$store.dispatch('firebase/bindStudies')
  }
}
</script>

<style lang="sass">
.main-section
  margin-top: 10rem
.study-group
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  padding: 4rem
.study-box
  width: 40ch
.width-30
  width: 30ch
</style>
