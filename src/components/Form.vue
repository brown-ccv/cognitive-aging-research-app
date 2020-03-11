<template>
  <div class="container">
    <label for="participant-form" class="label is-large"
      >Personal Information</label
    >
    <form id="participant-form" v-on:submit.prevent="submitForm">
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" v-model="form.name" />
      </div>

      <div class="control">
        <input class="input" type="text" v-model="form.age" />
      </div>

      <div class="control">
        <input class="input" type="text" v-model="form.phone" />
      </div>

      <div class="control">
        <button class="button is-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        age: 0,
        phone: 0
      }
    }
  },
  methods: {
    submitForm: function() {
      store.dispatch('firebase/createParticipant', this.form)
    }
  }
}
</script>
