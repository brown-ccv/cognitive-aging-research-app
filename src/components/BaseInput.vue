<template>
  <fieldset class="field">
    <label :for="id" class="label">{{ label }}</label>
    <div class="control has-icons-right">
      <input
        :id="id"
        class="input"
        :class="{
          error: error,
          success: valid
        }"
        @input="updateValue"
        v-on="listeners"
        v-bind="$attrs"
      />
      <span v-if="error" class="icon is-small is-right">
        <font-awesome-icon class="error" icon="exclamation-circle" />
      </span>
      <span v-if="valid" class="icon is-small is-right">
        <font-awesome-icon class="success" icon="check" />
      </span>
      <p class="is-danger help" v-if="error">{{ label }} is Required</p>
    </div>
  </fieldset>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    error: {
      type: Boolean,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    value: [String, Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
