<template>
  <article class="panel is-success content">
    <h5 class="panel-heading">
      Participant Profile
    </h5>
    <div class="info-group">
      <aside class="info-group-aside has-background-light">
        <div class="info-group-item">
          <p>Name</p>
        </div>
        <div class="info-group-item">
          <p>Year Born</p>
        </div>
        <div class="info-group-item">
          <p>Sex at Birth</p>
        </div>
        <div class="info-group-item">
          <p>Preferred Contact Method</p>
        </div>
        <div v-show="participant.email" class="info-group-item">
          <p>Email</p>
        </div>
        <div v-show="participant.phone" class="info-group-item">
          <p>Phone</p>
        </div>
        <div class="info-group-item">
          <p>Preferred Time of Contact</p>
        </div>
      </aside>
      <main class="info-group-main">
        <div class="info-group-item">
          <p>{{ participant.name }}</p>
        </div>
        <div class="info-group-item">
          <p>{{ participant.yob }}</p>
        </div>
        <div class="info-group-item">
          <p>{{ participant.sex_at_birth }}</p>
        </div>
        <div class="info-group-item">
          <p>{{ participant.contact_preference }}</p>
        </div>
        <div v-show="participant.email" class="info-group-item">
          <p>{{ participant.email }}</p>
        </div>
        <div v-show="participant.phone" class="info-group-item">
          <p>{{ participant.phone }}</p>
        </div>
        <div class="info-group-item">
          <ul>
            <li
              class="small preferred-time"
              v-for="(item, index) in participant.preferred_time_of_contact"
              v-bind:key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </main>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    participant: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>

.panel-heading
    margin-bottom: 0
.tag
    font-weight: bold
.info-group
    display: grid
    grid-template-areas: "aside main"
    &-aside
        text-transform: uppercase
        font-size: 0.7rem
        padding: 1rem
        grid-area: aside
        p
            padding-top: 0.3rem
    &-main
        padding: 1rem
        grid-area: main

.info-group-item
    min-height: 2.2rem
    margin-bottom: 0.2rem
</style>
