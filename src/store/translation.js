import TranslationService from "@/services/TranslationService";
import router from "@/router";
import {errorToString} from "@/utils/error";

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
        router.push({ name: 'translation-list'});
      })
      .catch(error => {
        this.addNotification({ type: 'danger', title: 'Opa', message: error.response && error.response.data.message });
      })
  },

  updateTranslation(id, data) {
    return new Promise((resolve, reject) => {
      TranslationService.updateTranslation(id, data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          this.addNotification({ type: 'danger', title: 'Opa', message: errorToString(error.response && error.response.data) });
          reject(error)
        })
    })
  },

  patchTranslation(id, data) {
    return TranslationService.patchTranslation(id, data)
      .catch(error => {
        this.addNotification({ type: 'danger', title: 'Opa', message: error.response && error.response.data.message });
      })
  },

  removeTranslation(id) {
    return TranslationService.removeTranslation(id)
      .then(response => {
        this.fetchTranslations();
      })
      .catch(error => {
        this.addNotification({ type: 'danger', title: 'Opa', message: error.response && error.response.data.message });
      })
  }
};