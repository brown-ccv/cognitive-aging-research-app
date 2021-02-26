<template>
  <div v-bind:class="{ container: !loggedIn }">
    <label for="participant-form" class="label is-large"
      >Personal Information</label
    >

    <form id="participant-form" v-on:submit.prevent="submitForm">
      <b-field label="Name">
        <b-input
          id="name"
          type="text"
          placeholder="Enter your name"
          v-model="form.name"
        >
        </b-input>
      </b-field>
      <b-field label="Year of Birth">
        <b-input
          id="yob"
          type="number"
          min="1910"
          max="2040"
          placeholder="Year of Birth"
          v-model="form.yob"
        >
        </b-input>
      </b-field>
      <b-field label="Sex at Birth">
        <b-select v-model="form.sex_at_birth">
          <option v-for="(option, idx) in sex_at_birth_options" :key="idx">
            {{ option }}
          </option>
        </b-select>
      </b-field>

      <label class="label is-large">Contact Information</label>

      <!-- <b-field horizontal> -->
      <b-field label="Preferred method of contact">
        <b-select v-model="form.contact_preference">
          <option v-for="(option, idx) in contact_options" :key="idx">
            {{ option }}
          </option>
        </b-select>
      </b-field>

      <div class="field">
        <label class="label">Preferred Time of Contact</label>
        <div>
          <b-checkbox
            v-for="(item, index) in preferred_time_of_contact_options"
            :key="index"
            type="is-light"
            v-model="form.preferred_time_of_contact"
            :id="item.label"
            :native-value="item.value"
          >
            {{ item.value }}
          </b-checkbox>
        </div>
      </div>

      <b-field label="Phone">
        <b-input
          id="phone"
          type="number"
          placeholder="Phone"
          v-model="form.phone"
        >
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input
          id="email"
          type="email"
          placeholder="Email"
          v-model="form.email"
        >
        </b-input>
      </b-field>

      <div class="control">
        <div v-if="success">
          Form successfully submitted.
          <font-awesome-icon class="success" icon="check" />
        </div>
        <div v-else-if="failed" class="flex">
          <button
            :disabled="$v.$anyError || $v.form.$invalid"
            class="button is-primary"
            :class="{ loading: loading }"
          >
            Submit
          </button>
          <div>
            Failed to submit form, try again.
            <font-awesome-icon class="error" icon="exclamation-circle" />
          </div>
        </div>
        <button
          v-else
          :disabled="$v.$anyError || $v.form.$invalid"
          class="button is-primary"
          :class="{ loading: loading }"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { email, numeric, required, requiredIf } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
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
      sex_at_birth: {
        required
      },
      contact_preference: {
        required
      },
      email: {
        email,
        required: requiredIf(function() {
          return this.form.contact_preference === 'email'
        })
      },
      phone: {
        numeric,
        required: requiredIf(function() {
          return this.form.contact_preference === 'phone'
        })
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
        sex_at_birth: null,
        email: '',
        contact_preference: 'email',
        preferred_time_of_contact: [],
        study: null,
        attempted_contact_date: null,
        contact_method: null,
        participant_response: null,
        participated_start_date: null,
        participated_end_date: null
      },
      sex_at_birth_options: ['-', 'male', 'female'],
      contact_options: ['phone', 'email'],
      preferred_time_of_contact_options: [
        {
          value: 'Morning (6 AM - 10 AM)',
          label: 'morning'
        },
        {
          value: 'Mid-day (10 AM - 2 PM)',
          label: 'mid_day'
        },
        {
          value: 'Afternoon (2 PM - 6 PM)',
          label: 'afternoon'
        },
        {
          value: 'Evening (6 PM - 10 PM)',
          label: 'evening'
        }
      ],
      loading: false,
      success: false,
      failed: false,
      submission_error: ''
    }
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      this.loading = true
      store.dispatch('firebase/createParticipant', this.form).then(
        () => {
          this.loading = false
          this.success = true
        },
        err => {
          this.failed = true
          this.submission_error = err
        }
      )
    }
  }
}
</script>
