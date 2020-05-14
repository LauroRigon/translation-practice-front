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

  createTranslation(data) {
    return TranslationService.createTranslation(data)
      .then(response => {
        this.addNotification({ type: 'success', title: 'Opa', message: 'Tudo certo' });
        this.fetchTranslations();
      })
      .catch(error => {
        this.addNotification({ type: 'danger', title: 'Opa', message: error.response && error.response.data.message });
      })
  },

  updateTranslation(data) {
    return TranslationService.updateTranslation(data)
      .then(response => {
        this.addNotification({ type: 'success', title: 'Opa', message: 'Tudo certo' });
        this.fetchTranslations();
      })
      .catch(error => {
        this.addNotification({ type: 'danger', title: 'Opa', message: error.response && error.response.data.message });
      })
  }
};