<template>
  <div class="notification" v-bind:class="'is-' + variant">
    <button class="delete" @click="close()"></button>
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  created() {
    setTimeout(() => this.close(), 4000)
  },
  methods: {
    close() {
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss" scoped></style>
