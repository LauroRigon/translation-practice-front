<template>
  <div>
    <h1>Listagem de Translations</h1>
    {{ sharedState.translations }}
  </div>
</template>

<script>
import store from "@/store";

function fetchTranslations(next) {
  store.fetchTranslations()
  .then(() => {
    next()
  });
}

export default {
  name: "TranslationList",

  data() {
    return {
      sharedState: store.state,
    }
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    fetchTranslations(next);
  }
}
</script>

<style scoped>

</style>