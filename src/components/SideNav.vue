<template>
  <aside class="menu side-navigation" v-bind:class="{ active: active }">
    <ul class="menu-list">
      <li class="nav-handle-outer">
        <button class="nav-handle" @click="toggleNav">
          <font-awesome-icon
            class="angle-double"
            v-bind:class="{ extended: active, collapsed: !active }"
            icon="angle-double-right"
            size="2x"
          />
        </button>
      </li>
      <li>
        <router-link
          class="side-navbar-item"
          v-bind:class="{ collapsed: !active }"
          to="/dashboard"
        >
          <font-awesome-icon
            class="nav-icon"
            v-bind:class="{ active: active }"
            icon="tachometer-alt"
          />
          <span v-show="active">Dashboard</span></router-link
        >
      </li>
      <li>
        <router-link
          class="side-navbar-item"
          v-bind:class="{ collapsed: !active }"
          to="/participants"
        >
          <font-awesome-icon
            class="nav-icon"
            v-bind:class="{ active: active }"
            icon="users"
          />
          <span v-show="active">Participants</span></router-link
        >
      </li>
      <li>
        <router-link
          class="side-navbar-item"
          v-bind:class="{ collapsed: !active }"
          to="/new-participant"
        >
          <font-awesome-icon
            class="nav-icon"
            v-bind:class="{ active: active }"
            icon="user-plus"
          />
          <span v-show="active">Add Participant</span></router-link
        >
      </li>
      <li>
        <router-link
          class="side-navbar-item"
          v-bind:class="{ collapsed: !active }"
          to="/studies"
        >
          <font-awesome-icon
            class="nav-icon"
            v-bind:class="{ active: active }"
            icon="newspaper"
          />
          <span v-show="active">Studies</span></router-link
        >
      </li>
      <li>
        <router-link
          class="side-navbar-item"
          v-bind:class="{ collapsed: !active }"
          to="/register"
        >
          <font-awesome-icon
            class="nav-icon"
            v-bind:class="{ active: active }"
            icon="id-card"
          />
          <span v-show="active">Register Administrator</span></router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      active: true
    }
  },
  methods: {
    toggleNav() {
      this.active = !this.active
      this.$emit('active', this.active)
    }
  }
}
</script>
<style lang="sass" scoped>
.nav-handle
  padding:1rem
  margin-left: 1rem
.angle-double
  transform: rotate(0deg)

.angle-double.extended
  animation: rotate 0.5s ease forwards


@keyframes rotate
  to
    transform: rotate(-180deg)
</style>
