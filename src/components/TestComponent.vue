<template>
  <div>
    <h1>Name</h1>
    <form v-on:submit.prevent="submitForm">
      <input type="text" v-model="form.name" />
      <input type="text" v-model="form.age" />
      <input type="text" v-model="form.phone" />
      <button class="button is-primary">Submit</button>
    </form>
    <li v-for="(item, k) in form" v-bind:key="item.id">
      <strong>{{ k }}:</strong> {{ item }}
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '_0213',
        name: '',
        age: 0,
        phone: 0
      }
    }
  },
  methods: {
    submitForm: function() {
      this.$store.dispatch('createParticipant', this.form)
    }
  }
}
</script>
