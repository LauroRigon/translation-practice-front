<template>
  <div class="form-group">
    <label v-if="label" :class="{ 'label--active': labelActive || !!value }"> {{ label }}</label>
    <select v-on="listeners" v-bind="$attrs" :value="value" class="form-input" :class="{ 'btn-block': block }">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="index"
        :selected="index === value"
      >{{ option }}</option>
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
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
