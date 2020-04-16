<template>
  <BrownLogo class="brown-logo" />
</template>

<script>
import BrownLogo from '@/assets/illustrations/brown-logo.svg'

export default {
  components: {
    BrownLogo
  }
}
</script>

<style lang="sass" scoped>
.brown-logo
    margin-left: 1rem
    padding: 0.2rem
    height: 3rem
    .st0
        display: none
    .st1
        display: inline
        stroke: #000000
        stroke-width: 0.75
        stroke-miterlimit: 10
    .st2
        stroke: #000000
        stroke-width: 0.75
        stroke-miterlimit: 10
    .st3
        fill: #FFFFFF
    .st4
        fill: #ED1C24
</style>
