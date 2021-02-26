<template>
  <div>
    <section>
      <h1 class="title">Currently registered content administrators</h1>
      <b-table
        :data="administrators"
        :columns="table_columns"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
      >
      </b-table>
    </section>
    <section class="my-6">
      <h1 class="title">Register a new content administrator</h1>
      <b-field label="Researcher's Brown Email">
        <b-input
          placeholder="Email"
          type="email"
          required
          v-model="admin_email"
        ></b-input>
      </b-field>
      <b-field label="Researcher's Lab">
        <b-input
          placeholder="Lab"
          type="text"
          required
          v-model="admin_lab"
        ></b-input>
      </b-field>
      <b-field>
        <b-button
          label="Register Researcher"
          :disabled="isDisabled"
          type="is-primary"
          @click="register"
        />
      </b-field>
      <b-field v-if="submission_message">
        <b-message>
          {{ submission_message }}
        </b-message>
      </b-field>
    </section>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import 'firebase/auth'
import { mapState } from 'vuex'
import store from '@/store/index'

export default {
  mixins: [validationMixin],
  validations: {
    admin_email: {
      required,
      email
    },
    admin_lab: {
      required
    }
  },
  data() {
    return {
      admin_email: '',
      admin_lab: '',
      submission_message: '',
      defaultSortDirection: 'asc',
      sortIcon: 'sort',
      sortIconSize: 'is-small',
      table_columns: [
        {
          field: 'id',
          label: 'Email',
          sortable: true
        },
        {
          field: 'lab',
          label: 'Lab'
        }
      ]
    }
  },
  computed: {
    ...mapState('firebase', ['administrators']),
    isDisabled() {
      return (
        !this.admin_email ||
        !this.admin_lab ||
        this.$v.admin_email.$invalid ||
        this.$v.admin_lab.$invalid
      )
    }
  },
  methods: {
    register() {
      console.log('here')
      store
        .dispatch('firebase/createAdministrator', {
          admin_email: this.admin_email,
          admin_lab: this.admin_lab
        })
        .then(
          () => {
            this.admin_email = ''
            this.admin_lab = ''
            this.submission_message = 'Researcher Successfully Registered'
          },
          err => {
            this.submission_failed = true
            this.submission_error = err.message
          }
        )
    }
  }
}
</script>
