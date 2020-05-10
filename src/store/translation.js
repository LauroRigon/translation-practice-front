import TranslationService from "@/services/TranslationService";

export const state = {
  translations: [],
};

export const methods = {

  fetchTranslations() {
    return TranslationService.getTranslations()
      .then(response => {
        this.state.translations = response.data;
      })
      .catch(error => {
        console.log(error)
        this.addNotification({ type: 'danger', title: 'Opss', message: 'Ocorreu um erro ao tentar recuperar Translations' })
      })
  },

  fetchTranslation(id) {
    return TranslationService.getTranslation(id);
  },
};