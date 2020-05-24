<template>
  <form @submit.prevent="onSubmit">
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
import {BButton} from "bootstrap-vue";
import {BOverlay} from "bootstrap-vue";

import BaseSelect from "@/components/common/BaseSelect";

import { LANG_LIST } from "@/consts/translation";

export default {
  name: "TranslationCreate",
  components: {BaseSelect, BButton, BOverlay},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
    },
    populateWith: {
      type: Object,
      default: () => ({
        empty: true
      })
    },
    findEnity: {
      type: Function,
    }
  },
  created() {
    if (!this.populateWith.empty) {
      this.form = this.populateWith;
    } else if (this.id && this.findEnity) {
      this.form = this.findEnity(this.id);
    }
  },
  data() {
    return {
      langOptions: {
        0: 'Selecione',
        ...LANG_LIST
      },
      form: {
        name: '',
        fromLang: 0,
        toLang: 0,
      }
    }
  },
  computed: {
    btnLabel() {
      return !this.id ? 'Criar' : 'Atualizar';
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.form);
    }
  },
}
</script>

<style scoped>

</style>