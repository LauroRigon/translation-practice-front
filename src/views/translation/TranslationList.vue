<template>
  <div class="translations">
    <BaseHeader>
      Listagem de <span class="header-highlight">Translations</span>
    </BaseHeader>

    <div class="d-flex align-items-baseline flex-wrap">
      <template v-for="translation in sharedState.translations">
        <TranslationItem :translation="translation" :key="translation._id"/>
      </template>

      <div class="translation-item d-flex justify-content-center align-content-center position-relative" @click="privateState.showCreate = true">
        <TranslationForm v-if="privateState.showCreate" @submit="handleSubmit"/>
        <div class="pt-2" v-else>
          <BIcon icon="plus-circle" scale="3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import BaseHeader from "@/components/common/BaseHeader";
import TranslationItem from "@/components/TranslationItem";
import TranslationForm from "@/components/TranslationForm";

function fetchTranslations(next) {
  store.fetchTranslations()
  .then(() => {
    next();
  });
}

export default {
  name: "TranslationList",
  components: {TranslationForm, TranslationItem, BaseHeader},
  data() {
    return {
      sharedState: store.state,
      privateState: {
        showCreate: false,
      }
    }
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    fetchTranslations(next);
  },

  methods: {
    handleSubmit(data) {
      store.createTranslation(data)
    },
  },
}
</script>