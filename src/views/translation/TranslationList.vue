<template>
  <div class="translations">
    <BaseHeader>
      Listagem de <span class="header-highlight">Translations</span>
    </BaseHeader>

    <div class="d-flex align-items-baseline flex-wrap">
      <template v-for="translation in sharedState.translations">
        <TranslationItem :translation="translation" :key="translation._id"/>
      </template>

      <router-link tag="div" :to="{ name: 'translation-create' }" class="translation-item d-flex justify-content-center align-content-center position-relative">
        <div class="pt-2">
          <BIcon icon="plus-circle" scale="3"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import BaseHeader from "@/components/common/BaseHeader";
import TranslationItem from "@/components/TranslationItem";

function fetchTranslations(next) {
  store.fetchTranslations()
  .then(() => {
    next();
  });
}

export default {
  name: "TranslationList",
  components: {TranslationItem, BaseHeader},
  data() {
    return {
      sharedState: store.state,
      privateState: {}
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