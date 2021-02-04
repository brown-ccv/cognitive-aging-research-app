<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item class="navbar-header-end" tag="a" href="https://brown.edu">
        <BrownLogo />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item class="custom-size" href="/">
        Cognitive Research
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-light"
            tag="router-link"
            to="/login"
            pack="fas"
            icon-right="sign-in-alt"
          >
            Researcher Login
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import BrownLogo from '@/components/BrownLogo'

export default {
  components: {
    BrownLogo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-name {
  padding-left: 40px;
}
.navbar-header-end {
  padding-right: 20px;
  border-right: 1px solid grey;
}
.custom-size {
  font-size: 20px;
  padding-left: 20px;
}
</style>
