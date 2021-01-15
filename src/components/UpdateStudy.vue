<template>
  <div>
    <main>
      <h1 class="title">{{ study.name }}</h1>
      <form id="study-update-form" v-on:submit.prevent="submitForm">
        <BaseInput
          id="name"
          label="Study Name"
          type="text"
          :placeholder="study.name"
          v-model="study.name"
          @blur="$v.study.name.$touch()"
          :error="$v.study.name.$error"
        />

        <BaseInput
          id="pi"
          label="PI"
          type="text"
          :placeholder="study.pi"
          v-model="study.pi"
          @blur="$v.study.pi.$touch()"
          :error="$v.study.pi.$error"
        />

        <BaseInput
          id="lab_name"
          label="Lab Name"
          type="text"
          :placeholder="study.lab_name"
          v-model="study.lab_name"
          @blur="$v.study.lab_name.$touch()"
          :error="$v.study.lab_name.$error"
        />

        <BaseInput
          id="lab_link"
          label="Lab Link"
          type="text"
          placeholder="Enter link to lab website"
          v-model="study.lab_link"
          @blur="$v.study.lab_link.$touch()"
          :error="$v.study.lab_link.$error"
          :valid="!$v.study.lab_link.$invalid"
        >
        </BaseInput>

        <BaseInput
          id="study_owner"
          label="Study Owner"
          type="text"
          placeholder="Enter Study Owner"
          v-model="study.study_owner"
          @blur="$v.study.study_owner.$touch()"
          :error="$v.study.study_owner.$error"
          :valid="!$v.study.study_owner.$invalid"
        >
        </BaseInput>

        <BaseInput
          id="description"
          label="Study Description"
          type="text"
          :placeholder="study.description"
          v-model="study.description"
          @blur="$v.study.description.$touch()"
          :error="$v.study.description.$error"
        />

        <div class="control">
          <div v-if="success">
            Data successfully saved.
            <font-awesome-icon class="success" icon="check" />
          </div>
          <div v-else-if="failed" class="flex">
            <button
              :disabled="$v.$anyError || $v.study.$invalid"
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
            :disabled="$v.$anyError || $v.study.$invalid"
            class="button is-primary"
            :class="{ loading: loading }"
          >
            Save
          </button>
        </div>
      </form>
    </main>
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
    ...mapState('firebase', ['study'])
  },
  validations: {
    study: {
      name: {
        required
      },
      pi: {
        required
      },
      lab_name: {
        required
      },
      description: {
        required
      },
      lab_link: {
        required
      },
      study_owner: {
        required
      }
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      this.$recaptcha('submit')
      this.loading = true
      store.dispatch('firebase/updateStudy', this.study).then(
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
