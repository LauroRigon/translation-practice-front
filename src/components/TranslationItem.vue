<template>
  <div class="translation-item">
    <BIcon class="translation-item__icon" v-if="!showEditForm" icon="pencil-square" scale="1" @click="showEditForm = !showEditForm"/>
    <BIcon class="translation-item__icon" v-else icon="x" scale="1" @click="showEditForm = !showEditForm"/>
    <router-link v-if="!showEditForm" tag="div" :to="{ name: 'translation-show', params: { id: translation._id }}">
      <div class="translation-item__name">
        <strong>{{ translation.name}}</strong>
      </div>

      <div class="translation-item__lang d-flex justify-content-between">
          <span>
            <strong>De:</strong> {{ LANG_LIST[translation.fromLang] }}
          </span>
          <span>
            <strong>Para:</strong> {{ LANG_LIST[translation.toLang] }}
          </span>
      </div>

      <div class="translation-item__meta">
        {{ translation.created | date }}
      </div>
    </router-link>
    <div v-else>
      <TranslationForm @submit="handleUpdate" :id="translation._id" :populate-with="translation"/>
      <BButton variant="danger" block type="submit" @click="handleRemove">
        Remover
      </BButton>
    </div>
  </div>
</template>

<script>
import TranslationForm from "@/components/TranslationForm";
import store from "@/store";
import { LANG_LIST } from "@/consts/translation";
import { BButton } from "bootstrap-vue";

export default {
  name: "TranslationItem",
  components: {TranslationForm, BButton},
  props: {
    translation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showEditForm: false,
      LANG_LIST,
    }
  },
  methods: {
    handleUpdate(data) {
      store.updateTranslation(data)
      .then(() => {
        this.showEditForm = false;
      })
    },
    handleRemove() {
      if (!window.confirm('Certeza?')) return;

      store.removeTranslation(this.translation._id);
    },
  },
}
</script>