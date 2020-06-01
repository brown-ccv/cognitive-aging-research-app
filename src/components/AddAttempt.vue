<template>
  <div class="block">
    <span class="title">Add Contact Attempt</span>
    <div class="attempt-form">
      <form id="participant-update-form" v-on:submit.prevent="submitForm">
        <div class="field field-date">
          <label class="label">Contact Date</label>
          <div class="control has-icons-right">
            <input
              class="date-input"
              type="date"
              v-model="form.attempted_contact_date"
            />
            <span class="icon is-small is-right">
              <font-awesome-icon icon="calendar" />
            </span>
          </div>
        </div>
        <div class="field-inline responses">
          <BaseSelect
            class="response-select"
            label="Contact Method"
            id="sex-at-birth"
            :options="['-', 'mail', 'phone']"
            v-model="form.contact_method"
            @blur="$v.form.contact_method.$touch()"
            :error="$v.form.contact_method.$error"
            :valid="!$v.form.contact_method.$invalid"
          />
          <BaseSelect
            class="response-select"
            label="Participant Responded"
            id="participant-responded"
            :options="['-', 'yes', 'no']"
            v-model="form.participant_responded"
            @blur="$v.form.participant_responded.$touch()"
            :error="$v.form.participant_responded.$error"
            :valid="!$v.form.participant_responded.$invalid"
          />
          <BaseSelect
            class="response-select"
            label="Participant Response"
            id="participant-response"
            :options="['-', 'yes', 'no']"
            v-model="form.participant_response"
            @blur="$v.form.participant_response.$touch()"
            :error="$v.form.participant_response.$error"
            :valid="!$v.form.participant_response.$invalid"
          />
        </div>
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
          <div class="field-inline attempt-buttons" v-else>
            <button
              :disabled="$v.$anyError"
              class="button is-primary"
              :class="{ loading: loading }"
            >
              Save
            </button>
            <button
              class="button is-danger attempt-cancel"
              @click="handleCancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
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
      store.dispatch('firebase/addLastAttempt', this.form)
      store.dispatch('firebase/createAttempt', this.form).then(
        () => {
          this.loading = false
          this.success = true
          this.$emit('success', this.success)
          setTimeout(() => {
            this.success = false
            this.form.attempted_contact_date = ''
            this.form.contact_method = ''
            this.form.participant_responded = ''
            this.form.participant_response = ''
          }, 1000)
        },
        err => {
          this.failed = true
          this.submission_error = err
        }
      )
    },
    handleCancel() {
      this.$emit('success', true)
    }
  }
}
</script>

<style lang="sass">
@import 'bulma'
.attempt-buttons
  margin-top: 1rem
.attempt-form
  margin-top: 2rem
.attempt-cancel
  margin-left: 2rem
.date-input
  @extend .input
.field-date
  width: 25%
.field-inline.responses
  justify-content: flex-start
.response-select
  margin-right: 1rem
.block
  margin-top: 2rem
</style>
