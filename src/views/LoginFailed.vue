<template>
  <div>
    <BaseNavBar />
    <div class="failed-login columns is-centered is-vcentered">
      <div class="column is-narrow">
        <article class="notification is-danger is-light is-multiline">
          <p class="title">Login Failed</p>
          <p class="subtitle">Only authorized researchers can login</p>
          <div class="content">
            If you are an authorized researcher, please make sure you are using
            you Brown Gmail account.
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.failed-login {
  padding: 4rem;
}
</style>
