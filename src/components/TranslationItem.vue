<template>
  <div class="translation-item">
    <router-link :to="{ name: 'translation-edit', params: {id: translation._id} }" tag="span">
      <font-awesome-icon icon="edit" class="translation-item__icon"/>
    </router-link>
    <router-link tag="div" :to="{ name: 'translation-show', params: { id: translation._id }}">
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
        {{ translation.createdAt | date }}
      </div>
    </router-link>
  </div>
</template>

<script>
import store from "@/store";
import { LANG_LIST } from "@/consts/translation";
import { BButton } from "bootstrap-vue";

export default {
  name: "TranslationItem",
  components: {BButton},
  props: {
    translation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      LANG_LIST,
    }
  },
}
</script>