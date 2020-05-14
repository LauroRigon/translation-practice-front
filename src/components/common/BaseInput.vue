<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input v-on="listeners" v-bind="$attrs" :value="value" class="form-input"/>
  </div>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  name: "BaseInput",
  mixins: [formFieldMixin],
};
</script>

<style>
  .form-group .form-input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #a970ff;
    color: #d3d3d3;

    z-index: 10;
  }

  .form-input:focus {
    outline: none;
    border-bottom-width: 2px;
  }
</style>
