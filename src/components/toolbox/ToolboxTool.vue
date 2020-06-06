<template>
  <div class="toolbox__tool" :class="{'toolbox__tool--active': active}" @click.stop="handleClick">
    <font-awesome-icon :icon="icon"/>
    <div class="toolbox__subtools">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolboxTool",
  props: {
    icon: {
      type: String,
    },
  },

  data() {
    return {
      active: false,
    }
  },

  methods: {
    handleClick(e) {
      this.active = !this.active;
      this.$emit('click', this.active);
    }
  },
}
</script>

<style scoped>

</style>