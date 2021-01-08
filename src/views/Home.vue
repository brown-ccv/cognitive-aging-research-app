<template>
  <div>
    <BaseNavBar v-if="!userProfile" />
    <div v-for="(study, i) in studies" :key="i" class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ study.name }}</strong>
              <br />
              {{ study.description }}
              <br />
              <strong>{{ study.lab_name }}</strong>
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
    <router-link
      to="new-participant"
      class="button is-primary is-large has-text-dark"
      >Click here to enter your name</router-link
    >
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
</style>
