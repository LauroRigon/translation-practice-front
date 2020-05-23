<template>
  <div class="translations">
    <BaseHeader>
      Listagem de <span class="header-highlight">Translations</span>
    </BaseHeader>

    <div class="d-flex align-items-baseline flex-wrap">
      <TranslationItem v-for="translation in sharedState.translations" :translation="translation">
        <TranslationCreate @submit="handleUpdate" :translation="translation" slot="edit-form"/>
      </TranslationItem>

      <div class="translation-item d-flex justify-content-center align-content-center position-relative" @click="privateState.showCreate = true">
        <TranslationCreate v-if="privateState.showCreate" @submit="handleSubmit"/>
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
import TranslationCreate from "@/components/TranslationCreate";

function fetchTranslations(next) {
  store.fetchTranslations()
  .then(() => {
    next();
  });
}

export default {
  name: "TranslationList",
  components: {TranslationCreate, TranslationItem, BaseHeader},
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

    handleUpdate(data) {
      store.updateTranslation(data)
    }
  },
}
</script>

<style scoped>

</style>