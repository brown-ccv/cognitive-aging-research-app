<template>
  <section class="hero is-small">
    <div class="hero-body hero-no-padding">
      <div class="columns">
        <div class="column">
          <div class="container title-padding">
            <p class="title">
              Cognitive Research at Brown
            </p>

            <p class="subtitle">
              Undertanding the cognitive and neural mechanisms of memory,
              learning, decision making, and cognitive control in adulthood
            </p>
            <router-link
              to="new-participant"
              class="button is-link is-large has-text-light"
              >Click here to contribute to our science</router-link
            >
          </div>
        </div>
        <div class="column">
          <HeroImage class="hero-pattern" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeroImage from '@/assets/illustrations/hero-pattern.svg'
export default {
  components: {
    HeroImage
  }
}
</script>
<style lang="sass" scoped>
.hero-pattern
    width: 100%
.hero-no-padding
    padding-top: 0rem !important
.title-padding
    padding-top: 9rem
    padding-left: 64px !important
</style>
