<template>
  <div>
    <main>
      <h1 class="title">{{ study.name }}</h1>
      <form id="study-update-form" v-on:submit.prevent="submitForm">
        <b-field label="Study Name">
          <b-input
            id="name"
            type="text"
            :placeholder="study.name"
            v-model="study.name"
          />
        </b-field>

        <b-field label="PI">
          <b-input
            id="pi"
            type="text"
            :placeholder="study.pi"
            v-model="study.pi"
          />
        </b-field>

        <b-field label="Lab Name">
          <b-input
            id="lab_name"
            type="text"
            :placeholder="study.lab_name"
            v-model="study.lab_name"
          />
        </b-field>

        <b-field label="Lab Link">
          <b-input
            id="lab_link"
            type="url"
            placeholder="Enter link to lab website"
            v-model="study.lab_link"
          >
          </b-input>
        </b-field>

        <b-field label="Study Owner">
          <b-input
            id="study_owner"
            type="text"
            placeholder="Enter Study Owner"
            v-model="study.study_owner"
          >
          </b-input>
        </b-field>

        <b-field label="Study Description">
          <b-input
            id="description"
            type="text"
            :placeholder="study.description"
          />
        </b-field>

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
import { required, url } from 'vuelidate/lib/validators'
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
        required,
        url
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
