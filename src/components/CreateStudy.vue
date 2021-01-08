<template>
  <div>
    <label for="participant-form" class="label is-large">Add New Study</label>

    <form id="participant-form" v-on:submit.prevent="submitForm">
      <BaseInput
        id="name"
        label="Name"
        type="text"
        placeholder="Enter the study name"
        v-model="form.name"
        @blur="$v.form.name.$touch()"
        :error="$v.form.name.$error"
        :valid="!$v.form.name.$invalid"
      >
      </BaseInput>

      <BaseInput
        id="pi"
        label="PI"
        type="text"
        placeholder="Enter PI"
        v-model="form.pi"
        @blur="$v.form.pi.$touch()"
        :error="$v.form.pi.$error"
        :valid="!$v.form.pi.$invalid"
      >
      </BaseInput>

      <BaseInput
        id="lab_name"
        label="Lab Name"
        type="text"
        placeholder="Enter Lab Name"
        v-model="form.lab_name"
        @blur="$v.form.lab_name.$touch()"
        :error="$v.form.lab_name.$error"
        :valid="!$v.form.lab_name.$invalid"
      >
      </BaseInput>

      <BaseInput
        id="description"
        label="Study Description"
        type="text"
        placeholder="Enter Study Description"
        v-model="form.description"
        @blur="$v.form.description.$touch()"
        :error="$v.form.description.$error"
        :valid="!$v.form.description.$invalid"
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
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    form: {
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
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        lab_name: '',
        pi: '',
        description: ''
      },
      loading: false,
      success: false,
      failed: false,
      submission_error: ''
    }
  },
  methods: {
    submitForm: async function() {
      await this.$recaptchaLoaded()
      await this.$recaptcha('submit')
      this.loading = true
      store.dispatch('firebase/createStudy', this.form).then(
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
