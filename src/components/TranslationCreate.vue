<template>
  <form @submit.prevent="handleSubmit">
    <BaseInput placeholder="Nome" v-model="form.name" block/>
    <BaseSelect placeholder="De" v-model="form.fromLang" :options="langOptions" block/>
    <BaseSelect placeholder="De" v-model="form.toLang" :options="langOptions" block/>

    <BOverlay :show="loading"
              rounded
              spinner-small
    >
      <BButton style="background-color: #a970ff;" block type="submit">
        {{ btnLabel }}
      </BButton>
    </BOverlay>
  </form>
</template>

<script>
import { BButton } from "bootstrap-vue";
import { BOverlay } from "bootstrap-vue";

import BaseSelect from "@/components/common/BaseSelect";
export default {
  name: "TranslationCreate",
  components: {BaseSelect, BButton, BOverlay},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    translation: {
      type: Object,
      default: () => ({
        name: '',
        fromLang: 0,
        toLang: 0,
      }),
    }
  },
  data() {
    return {
      form: this.translation,
      langOptions: [
        { id: 0, text: 'Selecione'},
        { id: 1, text: 'PT-BR'},
        { id: 2, text: 'EN'},
      ]
    }
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    }
  },

  computed: {
    btnLabel() {
      return !this.form._id ? 'Criar' : 'Atualizar';
    }
  },
}
</script>

<style scoped>

</style>