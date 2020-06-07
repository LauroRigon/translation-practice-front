<template>
  <div class="toolbox toolbox--primary" :class="{'toolbox--closed': !this.active}">
    <div class="toolbox__toggler" @click="toggleActive">
      <font-awesome-icon :icon="getIcon" size="lg"/>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppToolbox",
  data() {
    return {
      active: false,
    }
  },
  computed: {
    getIcon() {
      return this.active ? 'times' : 'arrow-right';
    }
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    }
  },
}
</script>

<style scoped>

</style>