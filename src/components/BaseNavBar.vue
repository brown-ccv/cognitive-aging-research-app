<template>
  <nav
    class="navbar has-background-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="www.brown.edu">
        <BrownLogo />
      </a>
      <h1 class="navbar-item">
        Cognitive Research at Brown
      </h1>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" href="/login"
              >Researcher Login
              <font-awesome-icon class="login-icon" icon="sign-in-alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import BrownLogo from '@/components/BrownLogo'

export default {
  components: {
    BrownLogo
  }
}
</script>
