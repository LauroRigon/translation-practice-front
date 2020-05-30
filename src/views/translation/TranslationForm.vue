<template>
  <form @submit.prevent="onSubmit">
    <BFormInput placeholder="Nome" v-model="form.name" block/>
    <BFormSelect placeholder="De" v-model="form.fromLang" :options="langOptions" class="mt-2"/>
    <BFormSelect placeholder="De" v-model="form.toLang" :options="langOptions" class="mt-2"/>

    <Redactor class="mt-2" @update="handleRedactorInput" :populate-with="translation.originalText"/>

    <BOverlay :show="loading"
              rounded
              spinner-small
    >
      <BButton style="background-color: #a970ff;" block type="submit" class="mt-2">
        {{ btnLabel }}
      </BButton>
    </BOverlay>
  </form>
</template>

<script>
import {BButton, BFormInput, BFormSelect} from "bootstrap-vue";
import {BOverlay} from "bootstrap-vue";

import BaseSelect from "@/components/common/BaseSelect";
import Redactor from "@/components/Redactor";

import { LANG_LIST } from "@/consts/translation";
import store from "@/store";

export default {
  name: "TranslationForm",
  components: {Redactor, BaseSelect, BButton, BOverlay, BFormInput, BFormSelect},
  props: {
    translation: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.translation) {
      this.form = { ...this.translation };
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
        originalText: '',
      }
    }
  },
  computed: {
    btnLabel() {
      return !this.translation ? 'Criar' : 'Atualizar';
    }
  },
  methods: {
    onSubmit() {
      if (!this.translation) {
        store.createTranslation(this.form);
      } else {
        store.updateTranslation(this.form);
      }
    },
    handleRedactorInput(Editor) {
      this.$set(this.form, 'originalText', Editor.getHTML());
    }
  },
}
</script>

<style scoped>
.ProseMirror {
  height: 35vh;
}
</style>