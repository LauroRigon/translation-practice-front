<template>
  <div class="translations">
    <BaseHeader>
      Listagem de <span class="header-highlight">Translations</span>
    </BaseHeader>

    <div class="d-flex align-items-baseline flex-wrap">
      <template v-for="translation in translations">
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

export default {
  name: "TranslationList",
  components: {TranslationItem, BaseHeader},
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch('translation/fetchTranslations')
      .then(() => {
        next();
      });
  },
  computed: {
    translations() {
      return this.$store.getters['translation/translations'];
    }
  },
}
</script>