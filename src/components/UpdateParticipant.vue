<template>
  <div class="container">
    <label for="participant-form" class="label is-large"
      >Personal Information</label
    >
    {{ participant.name }}
    {{ participant.yob }}
    {{ participant.sex_at_birth }}
    {{ participant.email }}
    {{ participant.phone }}
    {{ participant.contact_preference }}

    <form id="participant-update-form" v-on:submit.prevent="submitForm">
      <BaseInput
        id="date"
        label="date"
        type="date"
        placeholder="Attempted Contact Date"
        v-model="participant.attempted_contact_date"
      >
      </BaseInput>
      <div class="control">
        <div v-if="success">
          Form successfully submitted.
          <font-awesome-icon class="success" icon="check" />
        </div>
        <div v-else-if="failed" class="flex">
          <button
            :disabled="$v.$anyError || $v.participant.$invalid"
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
          :disabled="$v.$anyError || $v.participant.$invalid"
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
import { required } from 'vuelidate/lib/validators'

import { mapState } from 'vuex'

export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      success: false,
      failed: false,
      submission_error: ''
    }
  },
  computed: {
    ...mapState('firebase', ['participant'])
  },
  validations: {
    participant: {
      attempted_contact_date: {
        required
      }
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('submit')
      console.log(token)
      this.loading = true
      store.dispatch('firebase/updateParticipant', this.participant).then(
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
