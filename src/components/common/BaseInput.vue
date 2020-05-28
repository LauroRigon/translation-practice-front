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
