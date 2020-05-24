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
    <TranslationForm v-else @submit="handleUpdate" :id="this.translation._id" :populate-with="translation"/>
  </div>
</template>

<script>
import TranslationForm from "@/components/TranslationForm";
import store from "@/store";
import { LANG_LIST } from "@/consts/translation";

export default {
  name: "TranslationItem",
  components: {TranslationForm},
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
  },
}
</script>

<style>
.translation-item {
  position: relative;
  flex-basis: 270px;
  flex-shrink: 0;
  margin: 10px 20px;
  padding: 10px 10px 20px;
  border: 1px solid #484848e0;
  background-color: #383838;
  transition: transform .1s;
}

.translation-item:hover, .translation-item:focus {
  cursor: pointer;
  box-shadow: -5px 5px #a970ff;
  transform: translate(5px, -5px);
}

.translation-item__name {
  font-size: 20px;
}

.translation-item__meta {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1px 3px;
  font-size: 13px;
  font-weight: 100;
}
.translation-item__icon {
  position: absolute;
  top: 5px;
  right:5px;
  width: 20px;
  height: 20px;
}
.translation-item__icon:hover {
  color: #a970ff;
  transform: scale(1.2);
}
</style>