<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="columns is-mobile is-vcentered">
        <div class="column is-half is-multiline">
          <div class="container">
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
              >Contribute to our science</router-link
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
.hero-body
    padding-left: 6rem !important
    padding-right: 6rem !important
</style>
