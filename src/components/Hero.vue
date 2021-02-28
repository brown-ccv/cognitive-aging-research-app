<template>
  <section class="hero is-large hero-image">
    <div class="hero-body">
      <p class="title">
        Cognitive Research at Brown
      </p>

      <p class="subtitle">
        Understanding the cognitive and neural mechanisms of memory, learning,
        decision making, and cognitive control in adulthood
      </p>
      <router-link
        to="new-participant"
        class="button is-link is-outlined is-medium is-multiline"
        >Contribute to our science</router-link
      >
    </div>
  </section>
</template>

<style lang="sass" scoped>
.hero-body
.hero-image
    background-image: url('~@/assets/illustrations/annie-spratt-crop.jpg')
    background-position: center center
    background-repeat: no-repeat
    background-attachment: fixed
    background-size: cover
    background-color: #999
.button.is-multiline
  min-height: 2.25em
  white-space: unset
  height: auto
  flex-direction: column
  text-align: left
</style>
