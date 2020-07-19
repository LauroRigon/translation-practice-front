<template>
  <div class="translations overflow-hidden">
    <BaseHeader>
      Listagem de <span class="header-highlight">Translations</span>
    </BaseHeader>

    <div class="d-flex flex-wrap align-items-stretch">
      <template v-for="translation in translations">
        <TranslationItem :translation="translation" :key="translation._id"/>
      </template>

      <router-link tag="div" :to="{ name: 'translation-create' }" class="translation-item d-flex justify-content-center align-items-center">
        <font-awesome-icon icon="plus" size="3x"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import BaseHeader from "@/components/common/BaseHeader";
import TranslationItem from "@/components/TranslationItem";
import { gsap } from 'gsap';

export default {
  name: "TranslationList",
  components: {TranslationItem, BaseHeader},
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch('translation/fetchTranslations')
      .then(() => {
        next();
      });
  },
  mounted() {
    gsap.from('.translation-item', {
      duration: 0.1,
      opacity: 0,
      x: 300,
      ease: 'power3',
      stagger: 0.04,
    })
  },
  computed: {
    translations() {
      return this.$store.getters['translation/translations'];
    }
  },
}
</script>