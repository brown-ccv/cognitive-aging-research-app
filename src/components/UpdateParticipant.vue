<template>
  <div class="two-column-grid">
    <aside class="two-column-grid-side">
      <ParticipantInfo :participant="participant" />
    </aside>
    <main class="two-column-grid-main content">
      <fieldset class="field">
        <label v-if="!current_study.study" class="label">Select a study</label>
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="current_study">
                <option
                  v-for="(option, index) in participant_studies"
                  :key="'select' + index"
                  :value="option"
                >
                  {{ option.study.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </fieldset>

      <div v-if="current_study.study">
        <h1>{{ current_study.study.name }}</h1>
        <form id="participant-update-form" v-on:submit.prevent="submitForm">
          <div class="field">
            <div class="control">
              <div class="select">
                <datepicker
                  :value="current_study.attempted_contact_date"
                  v-model="current_study.attempted_contact_date"
                  name="attempted_contact"
                ></datepicker>
              </div>
            </div>
          </div>
          <BaseInput
            id="attempted"
            label="Attempted Contact Date"
            type="date"
            v-model="current_study.attempted_contact_date"
            @blur="$v.current_study.attempted_contact_date.$touch()"
            :error="$v.current_study.attempted_contact_date.$error"
            :valid="!$v.current_study.attempted_contact_date.$invalid"
          />
          <BaseInput
            id="contact_method"
            label="Contact Method"
            type="text"
            placeholder="Enter contact method"
            v-model="current_study.contact_method"
            @blur="$v.current_study.contact_method.$touch()"
            :error="$v.current_study.contact_method.$error"
            :valid="!$v.current_study.contact_method.$invalid"
          />
          <BaseSelect
            label="Participant Response"
            id="sex-at-birth"
            :options="['-', 'yes', 'no']"
            v-model="current_study.participant_response"
          />

          <div class="field-inline">
            <BaseInput
              class="field"
              id="start_date"
              label="Study Participation Start Date"
              type="date"
              v-model="current_study.participated_start_date"
              @blur="$v.current_study.participated_start_date.$touch()"
              :error="$v.current_study.participated_start_date.$error"
              :valid="!$v.current_study.participated_start_date.$invalid"
            />

            <BaseInput
              class="field"
              id="end_date"
              label="Study Participation End Date"
              type="date"
              v-model="current_study.participated_end_date"
              @blur="$v.current_study.participated_end_date.$touch()"
              :error="$v.current_study.participated_end_date.$error"
              :valid="!$v.current_study.participated_end_date.$invalid"
            />
          </div>

          <div class="control">
            <div v-if="success">
              Data successfully saved.
              <font-awesome-icon class="success" icon="check" />
            </div>
            <div v-else-if="failed" class="flex">
              <button
                :disabled="$v.$anyError || $v.current_study.$invalid"
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
              :disabled="$v.$anyError || $v.current_study.$invalid"
              class="button is-primary"
              :class="{ loading: loading }"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

import ParticipantInfo from '@/components/ParticipantInfo'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    ParticipantInfo,
    Datepicker
  },
  mixins: [validationMixin],
  data() {
    return {
      current_study: {},
      loading: false,
      success: false,
      failed: false,
      submission_error: ''
    }
  },

  computed: {
    ...mapState('firebase', ['participant', 'participant_studies'])
  },
  validations: {
    current_study: {
      attempted_contact_date: {
        required
      },
      contact_method: {
        required
      },
      participated_start_date: {
        required
      },
      participated_end_date: {
        required
      }
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      this.$recaptcha('submit')
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

<style lang="sass" scoped>
.two-column-grid
    display: grid
    grid-template-areas: "side . main"
    grid-template-columns: 6fr 0.2fr 8fr
    grid-template-rows: auto
    &-side
        grid-area: side
        padding: 1rem
    &-main
        grid-area: main
        padding: 1rem

.field-inline
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: flex-start
  .field
    margin-right: 2rem
</style>
