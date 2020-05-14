<template>
  <div class="form-group">
    <label v-if="label" :class="{ 'label--active': labelActive || !!value }"> {{ label }}</label>
    <select v-on="listeners" v-bind="$attrs" :value="value" class="form-input" :class="{ 'btn-block': block }">
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="option.id === value"
      >{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
import formFieldMixin from "../../mixins/formFieldMixin";

export default {
  name: "BaseSelect",
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
