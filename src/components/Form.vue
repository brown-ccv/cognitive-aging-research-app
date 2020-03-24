<template>
  <div class="container">
    <label for="participant-form" class="label is-large"
      >Personal Information</label
    >
    <form id="participant-form" v-on:submit.prevent="submitForm">
      <BaseInput
        id="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        v-model="form.name"
        @blur="$v.form.name.$touch()"
        :error="$v.form.name.$error"
        :valid="!$v.form.name.$invalid"
      >
      </BaseInput>

      <BaseInput
        id="yob"
        label="Year of Birth"
        type="text"
        placeholder="Year of Birth"
        v-model="form.yob"
        @blur="$v.form.yob.$touch()"
        :error="$v.form.yob.$error"
        :valid="!$v.form.yob.$invalid"
      >
      </BaseInput>

      <BaseSelect
        label="Preferred method of contact"
        id="preferred-contact"
        :options="contact_options"
        v-model="form.contact_preference"
      />

      <BaseInput
        id="phone"
        label="Phone"
        type="text"
        placeholder="Phone"
        v-model="form.phone"
        @blur="$v.form.phone.$touch()"
        :error="$v.form.phone.$error"
        :valid="!$v.form.phone.$invalid && form.contact_preference === 'phone'"
      >
      </BaseInput>

      <BaseInput
        id="email"
        label="Email"
        type="text"
        placeholder="Email"
        v-model="form.email"
        @blur="$v.form.email.$touch()"
        :error="$v.form.email.$error"
        :valid="!$v.form.email.$invalid && form.contact_preference === 'email'"
      >
      </BaseInput>

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
        email: '',
        contact_preference: 'email'
      },
      contact_options: ['phone', 'email'],
      loading: false,
      success: false,
      failed: false,
      submission_error: ''
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit')
      console.log(token)
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
