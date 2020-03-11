<template>
  <div class="container">
    <label for="participant-form" class="label is-large"
      >Personal Information</label
    >
    <form id="participant-form" v-on:submit.prevent="submitForm">
      <div class="field">
        <label class="label">Name</label>
        <div class="control has-icons-right">
          <input
            class="input"
            type="text"
            v-model="form.name"
            placeholder="Name"
            :class="{
              error: $v.form.name.$error,
              success: !$v.form.name.$invalid
            }"
            @blur="$v.form.name.$touch()"
          />
          <span v-if="$v.form.name.$error" class="icon is-small is-right">
            <font-awesome-icon icon="exclamation-circle" />
          </span>
          <span v-if="!$v.form.name.$invalid" class="icon is-small is-right">
            <font-awesome-icon icon="check" />
          </span>
          <p class="is-danger help" v-if="$v.form.name.$error">
            Name Is Required
          </p>
        </div>
      </div>

      <div class="control">
        <input
          class="input"
          type="text"
          v-model="form.yob"
          placeholder="Year of Birth"
        />
      </div>

      <div class="control">
        <input
          class="input"
          type="text"
          v-model="form.contact_preference"
          placeholder="Preferred Contact Method"
        />
      </div>

      <div class="control">
        <input
          class="input"
          type="text"
          v-model="form.email"
          placeholder="Email"
        />
      </div>

      <div class="control">
        <input
          class="input"
          type="text"
          v-model="form.phone"
          placeholder="Phone"
        />
      </div>

      <div class="control">
        <button :disabled="$v.$invalid" class="button is-primary">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { email, numeric, required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required
      },
      yob: {
        required,
        numeric
      },
      contact_preference: {
        required
      },
      email: {
        email
      },
      phone: {
        numeric
      }
    }
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        yob: null,
        phone: null,
        email: '',
        contact_preference: ''
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
