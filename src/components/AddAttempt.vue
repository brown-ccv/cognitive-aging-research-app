<template>
  <div>
    <div class="studies-title">
      <span class="title"
        >Adding contact attempt for: {{ current_study.study.name }}</span
      >
    </div>
    <form id="participant-update-form" v-on:submit.prevent="submitForm">
      <div class="field">
        <div class="control">
          <label class="label">Contact Date</label>
          <div class="select">
            <datepicker
              input-class="datepicker-input"
              :value="form.attempted_contact_date"
              v-model="form.attempted_contact_date"
              name="attempted_contact"
            ></datepicker>
          </div>
        </div>
      </div>

      <BaseSelect
        label="Contact Method"
        id="sex-at-birth"
        :options="['-', 'mail', 'phone']"
        v-model="form.contact_method"
        @blur="$v.form.contact_method.$touch()"
        :error="$v.form.contact_method.$error"
        :valid="!$v.form.contact_method.$invalid"
      />

      <BaseSelect
        label="Participant Responded"
        id="participant-responded"
        :options="['-', 'yes', 'no']"
        v-model="form.participant_responded"
        @blur="$v.form.participant_responded.$touch()"
        :error="$v.form.participant_responded.$error"
        :valid="!$v.form.participant_responded.$invalid"
      />
      <BaseSelect
        label="Participant Response"
        id="participant-response"
        :options="['-', 'yes', 'no']"
        v-model="form.participant_response"
        @blur="$v.form.participant_response.$touch()"
        :error="$v.form.participant_response.$error"
        :valid="!$v.form.participant_response.$invalid"
      />

      <div class="control">
        <div v-if="success">
          Data successfully saved.
          <font-awesome-icon class="success" icon="check" />
        </div>
        <div v-else-if="failed" class="flex">
          <button
            :disabled="$v.$anyError || $v.form.$invalid"
            class="button is-primary"
            :class="{ loading: loading }"
          >
            Save
          </button>
          <div>
            Failed to save form, try again.
            <font-awesome-icon class="error" icon="exclamation-circle" />
          </div>
        </div>
        <button
          v-else
          :disabled="$v.$anyError"
          class="button is-primary"
          :class="{ loading: loading }"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  mixins: [validationMixin],
  data: function() {
    return {
      loading: false,
      failed: false,
      submission_error: '',
      success: false
    }
  },
  computed: {
    form() {
      return {
        participantId: this.participantId,
        studyId: this.current_study.id,
        attempted_contact_date: '',
        contact_method: '',
        participant_responded: '',
        participant_response: ''
      }
    }
  },
  validations: {
    form: {
      attempted_contact_date: {
        required
      },
      contact_method: {
        required
      },
      participant_responded: {
        required
      },
      participant_response: {
        required
      }
    }
  },
  props: {
    current_study: {
      type: Object,
      required: true
    },
    participantId: {
      type: String,
      required: true
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      this.$recaptcha('submit')
      this.loading = true
      store.dispatch('firebase/createAttempt', this.form).then(
        () => {
          this.loading = false
          this.success = true
          this.$emit('success', this.success)
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

<style lang="sass" scoped></style>
