<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/form">Form</router-link>
          <router-link class="navbar-item" to="/dashboard"
            >Dashboard</router-link
          >
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <BaseLoginStatus class="navbar-item" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  created() {
    this.loginStatus()
  },
  methods: {
    loginStatus() {
      store.dispatch('login/loginStatus')
    }
  }
}
</script>
