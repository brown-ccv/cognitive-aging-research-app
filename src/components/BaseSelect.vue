<template>
  <fieldset class="field">
    <label :for="id" class="label">{{ label }}</label>
    <div class="control">
      <div class="select">
        <select :name="label" :id="id" @input="updateValue">
          <option v-for="opt in options" :key="opt" :selected="opt === value">{{
            opt
          }}</option>
        </select>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
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
