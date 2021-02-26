<template>
  <div>
    <label for="participant-form" class="label is-large">Add New Study</label>

    <form id="participant-form" v-on:submit.prevent="submitForm">
      <b-field label="Name">
        <b-input
          id="name"
          type="text"
          requiered
          placeholder="Enter the study name"
          v-model="form.name"
        >
        </b-input>
      </b-field>
      <b-field label="PI">
        <b-input
          id="pi"
          type="text"
          requiered
          placeholder="Enter PI"
          v-model="form.pi"
        >
        </b-input>
      </b-field>

      <b-field label="Lab Name">
        <b-input
          id="lab_name"
          type="text"
          requiered
          placeholder="Enter Lab Name"
          v-model="form.lab_name"
        >
        </b-input>
      </b-field>

      <b-field label="Lab Link">
        <b-input
          id="lab_link"
          type="url"
          placeholder="Enter link to lab website"
          v-model="form.lab_link"
        >
        </b-input>
      </b-field>

      <b-field label="Study Owner">
        <b-input
          id="study_owner"
          type="text"
          placeholder="Enter Study Owner"
          v-model="form.study_owner"
        >
        </b-input>
      </b-field>
      <b-field label="Study Description">
        <b-input
          id="description"
          type="text"
          placeholder="Enter Study Description"
          v-model="form.description"
        >
        </b-input>
      </b-field>

      <div class="buttons">
        <b-button
          native-type="submit"
          :disabled="$v.$anyError || $v.form.$invalid"
          type="is-primary"
          :class="{ loading: loading }"
        >
          Submit
        </b-button>
        <b-button @click="reset" type="is-light" :class="{ loading: loading }">
          Reset
        </b-button>
      </div>

      <div class="control">
        <div v-if="success">
          Form successfully submitted.
          <font-awesome-icon class="success" icon="check" />
        </div>
        <div v-else-if="failed" class="flex">
          <div>
            Failed to submit form, try again.
            <font-awesome-icon class="error" icon="exclamation-circle" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/index'
import { validationMixin } from 'vuelidate'
import { required, url } from 'vuelidate/lib/validators'

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
      },
      lab_link: {
        required,
        url
      },
      study_owner: {
        required
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        lab_name: '',
        lab_link: '',
        study_owner: '',
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
    reset() {
      this.form.name = ''
      this.form.lab_name = ''
      this.form.lab_link = ''
      this.form.study_owner = ''
      this.form.pi = ''
      this.form.description = ''
    },
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
