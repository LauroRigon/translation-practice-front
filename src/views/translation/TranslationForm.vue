<template>
  <div class="d-flex justify-content-center">
    <div class="simple-card flex-grow-1 position-relative" style="max-width: 800px;">
      <b-button
        v-if="translation && translation._id"
        @click="handleRemove"
        class="position-absolute bg-danger border-0"
        style="top:0; right: 0;"
      >
        <b-icon icon="trash"></b-icon>
      </b-button>
      <form @submit.prevent="onSubmit">
        <b-form-group
          label="Name"
          label-for="name"
        >
          <b-form-input
            placeholder="Name"
            v-model="form.name"
            block
            @blur="$v.form.name.$touch()"
          />
          <template v-if="$v.form.name.$error">
            <p class="text-danger" v-if="!$v.form.name.required">Name is required</p>
          </template>
        </b-form-group>

        <b-form-group
          label="Translating from"
          label-for="fromLang"
        >
          <b-form-select
            placeholder="De"
            v-model="form.fromLang"
            :options="langOptions"
            class="mt-2"
            @blur="$v.form.fromLang.$touch()"
          />
          <template v-if="$v.form.fromLang.$error">
            <p class="text-danger" v-if="!$v.form.fromLang.required">Required</p>
          </template>
        </b-form-group>
        <b-form-group
          label="Translating to"
          label-for="fromLang"
        >
          <b-form-select placeholder="De" v-model="form.toLang" :options="langOptions" class="mt-2"/>
        </b-form-group>

        <b-form-group
          label="Original text"
          label-for="fromLang"
        >
          <redactor
            class="mt-2" @update="handleRedactorInput"
            :populate-with="translation && translation.originalText"
            @blur="$v.form.originalText.$touch()"
          />
          <template v-if="$v.form.originalText.$error">
            <p v-if="!$v.form.originalText.required">Original Text is required</p>
          </template>
        </b-form-group>

        <b-overlay
          :show="loading"
          rounded
          spinner-small
        >
          <b-button
            variant="primary"
            block
            type="submit"
            class="mt-2"
            :disabled="$v.form.$anyError"
          >
            {{ btnLabel }}
          </b-button>
        </b-overlay>
      </form>
    </div>
  </div>
</template>

<script>
import {BFormGroup, BButton, BFormInput, BFormSelect, BFormFile} from "bootstrap-vue";
import {BOverlay} from "bootstrap-vue";
import { required } from 'vuelidate/lib/validators'

import BaseSelect from "@/components/common/BaseSelect";
import Redactor from "@/components/Redactor";

import { LANG_LIST } from "@/consts/translation";
import store from "@/store";
import router from "@/router";

export default {
  name: "TranslationForm",
  components: {Redactor, BaseSelect, BButton, BOverlay, BFormInput, BFormSelect, BFormFile, BFormGroup},
  validations: {
    form: {
      name: { required },
      fromLang: { required },
      toLang: { required },
      originalText: { required },
    }
  },
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
      this.$v.form.$touch();
      if (this.$v.$anyError) return;

      if (!this.translation) {
        store.dispatch('translation/createTranslation', this.form);
      } else {
        store.dispatch('translation/updateTranslation', { id: this.translation._id, translation: this.form })
        .then(() => {
          router.push({ name: 'translation-list'});
        });
      }
    },
    handleRedactorInput(Editor) {
      this.$set(this.form, 'originalText', Editor.getHTML());
    },
    handleRemove() {
      if (!window.confirm('Are you sure?')) return;

      store.dispatch('translation/removeTranslation', this.translation._id);
    },
    handleChangeFile(e) {
      this.form.audioFile = e.target.files[0];
    },
  },
}
</script>

<style scoped>
.ProseMirror {
  height: 35vh;
}
</style>