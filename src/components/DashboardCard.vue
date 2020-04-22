<template>
  <section class="dashboard-card">
    <header class="dashboard-card-header">{{ header }}</header>
    <main class="dashboard-card-main">{{ main }}</main>
    <footer class="dashboard-card-footer">{{ footer }}</footer>
  </section>
</template>

<script>
export default {
  props: {
    header: {
      type: String
    },
    main: {
      type: String
    },
    footer: {
      type: String
    }
  }
}
</script>

<style lang="sass">
@import 'bulma'
.dashboard-card
    padding: 2rem
    border: 1px solid $primary
    border-radius: 5px
    height: 15rem
    min-width: 15rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    @extend .has-background-light
    margin: 2rem
.dashboard-card-header
    @extend .title
.dashboard-card-main
    font-size: 4rem
    font-weight: bold
    color: $success
.dashboard-card-footer
    font-weight: bold
    color: $info
</style>
