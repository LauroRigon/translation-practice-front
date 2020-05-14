<template>
  <component :is="tagSize">
    <slot></slot>
  </component>
</template>

<script>
const TAG_SIZE = {
  'small': 'h4',
  'medium': 'h3',
  'large': 'h2',
}

export default {
  name: "BaseHeader",

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return Object.keys(TAG_SIZE).indexOf(value) !== -1;
      }
    },
  },

  computed: {
    tagSize() {
      return TAG_SIZE[this.size];
    }
  },
}
</script>

<style scoped>
  .header-highlight {
    color: #a970ff;
  }
</style>