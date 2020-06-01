<template>
  <div>
    <div>
      <p class="title">Participant Profile</p>
    </div>
    <article>
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
          <div class="info-group-item">
            <p>Last Contact Attempt</p>
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
          <div v-show="participant.last_contacted" class="info-group-item">
            <ul>
              <li>
                Date: {{ participant.last_contacted.attempted_contact_date }}
              </li>
              <li>
                Contact Successful:
                {{ participant.last_contacted.participant_responded }}
              </li>
              <li v-show="participant.last_contacted.participant_response">
                Response: {{ participant.last_contacted.participant_response }}
              </li>
            </ul>
          </div>
        </main>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    participant: {
      type: Object,
      required: true
    },
    studies: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'bulma'
.panel-heading
    margin-bottom: 0
.tag
    font-weight: bold
.info-group
    display: grid
    grid-template-areas: "aside main"
    grid-template-columns: 2fr 2fr
    border: 1px solid $primary
    border-radius: 3px
    width: 80%
    margin-top: 2rem
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
