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
          id="end_date"
          label="Grant Number"
          type="text"
          :placeholder="study.grant_number"
          v-model="study.grant_number"
          @blur="$v.study.grant_number.$touch()"
          :error="$v.study.grant_number.$error"
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
      grant_number: {
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
